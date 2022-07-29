import { useState, useEffect } from "react";
import { database, storage } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  listAll,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { Loader } from "./Loader";

const dbInstance = collection(database, "notes");
const listRef = ref(storage, "files/");

export default function NoteOperations() {
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes();
    getFiles();
  }, []);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
      getNotes();
    });
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getMetadata(uploadTask.snapshot.ref).then((data) => {
          console.log(data);
        });
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl((prev) => [...prev, url]);
        });
      }
    );
  };

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const getFiles = () => {
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setImgUrl((prev) => [...prev, url]);
          });
          // All the items under listRef.
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };
  return (
    <>
      <div className="">
        <button className="_button-auth" onClick={inputToggle}>
          Add a New Note
        </button>
      </div>

      {isInputVisible ? (
        <div className="">
          <input
            className=""
            placeholder="Enter the Title.."
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <button onClick={saveNote} className="">
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}

      <div>
        {notesArray.map((note) => {
          return (
            <div key={note.id}>
              <h3>{note.noteTitle}</h3>
              <p>{note.noteDesc}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-10" />
      <div className="space-x-3">
        <input type="file" onChange={handleChange} accept="/image/*" />
        <button className="_button-auth" onClick={handleUpload}>
          Upload to Firebase
        </button>
      </div>
      <Loader percent={percent} />
      <div className="grid grid-cols-3 w-full gap-6">
        {imgUrl ? (
          imgUrl.map((img, i) => {
            return (
              <div key={i} className="flex flex-col space-y-3">
                <Image
                  width={300}
                  height={200}
                  src={img}
                  alt="something"
                  className="rounded-md"
                />
                <button className="_button-auth self-start">Delete</button>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
