import { useState, useEffect, useRef } from "react";
import { database } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const dbInstance = collection(database, "notes");

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

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

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
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
    </>
  );
}
