import { useState, useEffect, useRef } from "react";
import { storage } from "../lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { Loader } from "./Loader";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";

const listRef = ref(storage, "files/");

export default function NoteOperations() {
  const inputFileRef = useRef();
  const [files, setFile] = useState([]);
  const [uploadTask, setUploadTask] = useState({});
  const [imgUrl, setImgUrl] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    getFiles();
  }, []);
  const handleChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    const uploaded = [...files];
    chosenFiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setFile(uploaded);
  };

  const putStorageItem = (item) => {
    // the return value will be a Promise
    const storageRef = ref(storage, `/files/${item.name}`);
    const uploadTaskRef = uploadBytesResumable(storageRef, item);
    setUploadTask(uploadTaskRef);
    setIsUpload(true);
    uploadTaskRef.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.error(err),
      () => {
        getDownloadURL(uploadTaskRef.snapshot.ref).then((url) => {
          setImgUrl((prev) => [...prev, url]);
        });
        inputFileRef.current.value = "";
        setFile("");
        setIsUpload(false);
      }
    );
  };

  const handleUpload = () => {
    if (!files) {
      alert("Please choose a file first!");
      return;
    }

    Promise.all(files.map((item) => putStorageItem(item)))
      .then((url) => {
        console.log(url, `All success`);
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
      });
  };

  const handleCancel = () => {
    uploadTask.cancel();
    inputFileRef.current.value = "";
    setIsUpload(false);
    setPercent(0);
    setFile("");
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

  const deleteFile = (img) => {
    const name = decodeURIComponent(img.split("files%2F").pop().split("?")[0]);
    const fileRef = ref(storage, `files/${name}`);
    deleteObject(fileRef)
      .then(() => {
        const url = imgUrl.filter((el) => el !== img);
        setImgUrl(url);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <>
      <h2 className="mb-5">
        {files ? "Add memories to your story" : "Start by adding some memories"}
      </h2>
      <div className="space-x-3">
        <input
          type="file"
          multiple="multiple"
          ref={inputFileRef}
          onChange={handleChange}
          accept="/image/*"
        />
        <ButtonPrimary
          handleClick={handleUpload}
          label={"Upload"}
          type={"button"}
        />
        {isUpload ? (
          <ButtonPrimary
            handleClick={handleCancel}
            label={"Cancel"}
            type={"button"}
          />
        ) : (
          <></>
        )}
      </div>
      <Loader percent={percent} />
      <div className="grid grid-cols-3 w-full gap-6 mt-10">
        {imgUrl ? (
          imgUrl.map((img, i) => {
            return (
              <div key={i} className="flex flex-col space-y-3">
                <div className="w-full aspect-video relative">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={img}
                    alt="something"
                    className="rounded-md"
                  />
                </div>
                <ButtonSecondary
                  handleClick={() => deleteFile(img)}
                  label={"Delete"}
                />
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
