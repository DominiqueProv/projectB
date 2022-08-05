import { useState, useEffect, useRef } from "react";
import { storage } from "../lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  updateMetadata,
  listAll,
  deleteObject,
} from "firebase/storage";
import Medias from "./Medias";
import { Loader } from "./Loader";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import Timeline from "./Timeline";
import { formatDate } from "../utils/date";

const listRef = ref(storage, "files/");

export default function NoteOperations() {
  const inputFileRef = useRef();
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [uploadTask, setUploadTask] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [percent, setPercent] = useState(0);

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
    setFiles(uploaded);
  };

  const putStorageItem = (item) => {
    console.log(item);
    const metadata = {
      customMetadata: {
        originalDate: `${item.lastModified.toString()}`,
      },
    };
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
      (err) => console.error(err.message),
      () => {
        const data = {};
        getDownloadURL(uploadTaskRef.snapshot.ref).then((url) => {
          data.url = url;
        });
        updateMetadata(storageRef, metadata)
          .then((metadata) => {})
          .catch((error) => {});
        getMetadata(storageRef)
          .then((metadata) => {
            data.metadata = metadata;
            setFilesData((prev) => [...prev, data]);
          })
          .catch((error) => {
            console.error(error);
          });
        inputFileRef.current.value = "";
        setFiles([]);
        setIsUpload(false);
      }
    );
  };

  const handleUpload = () => {
    if (!files.length) {
      alert("Please choose a file first!");
      return;
    }
    Promise.all(files.map((item) => putStorageItem(item)))
      .then(() => {
        console.log(`All success`);
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
    setFiles([]);
  };

  const getFiles = () => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const data = {};
          getDownloadURL(itemRef).then((url) => {
            data.url = url;
          });
          getMetadata(itemRef)
            .then((metadata) => {
              data.metadata = metadata;
              setFilesData((prev) => [...prev, data]);
            })
            .catch((error) => {
              console.error(error.message);
            });
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const deleteFile = (file) => {
    const name = decodeURIComponent(
      file.url.split("files%2F").pop().split("?")[0]
    );
    const fileRef = ref(storage, `files/${name}`);
    deleteObject(fileRef)
      .then(() => {
        const files = filesData.filter((el) => el.url !== file.url);
        setFilesData(files);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <>
      <h2 className="mb-5">
        {filesData.length
          ? "Add memories to your story"
          : "Start by adding some memories"}
      </h2>
      <div className="space-x-3">
        <input
          type="file"
          multiple="multiple"
          ref={inputFileRef}
          onChange={handleChange}
          accept=".png, .jpeg, video/*"
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
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-6 mt-10 relative">
        {filesData.length && <Timeline files={filesData} />}
        {filesData.length ? (
          filesData.map((file, i) => {
            return (
              <div key={i} className="flex flex-col space-y-3">
                <div className="w-full aspect-video relative rounded-md overflow-hidden">
                  <Medias file={file} />
                </div>
                <ul>
                  <li>
                    {formatDate(file.metadata.customMetadata.originalDate)}
                  </li>
                </ul>
                <ButtonSecondary
                  handleClick={() => deleteFile(file)}
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
