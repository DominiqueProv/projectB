import { useState, useEffect, useRef } from "react";
import { storage } from "../lib/firebase";
import { v4 } from "uuid";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  updateMetadata,
  listAll,
  deleteObject,
} from "firebase/storage";
import { Loader } from "./Loader";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { CgSpinner } from "react-icons/cg";
import Timeline from "./Timeline";
import Icon from "./buttons/Icon";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import FileCard from "./cards/FileCard";

const listRef = ref(storage, "files/");

const FileOperations = () => {
  const inputFileRef = useRef();
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [uploadTask, setUploadTask] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [isFilesLoaded, setIsFilesLoaded] = useState(false);
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
    const ext = item.name.split(".").pop();
    const metadata = {
      customMetadata: {
        originalDate: `${item.lastModified.toString()}`,
      },
    };
    const storageRef = ref(storage, `/files/${v4()}.${ext}`);
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
        // inputFileRef.current.value = "";
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
    // inputFileRef.current.value = "";
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
      .then(() => {
        setIsFilesLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const deleteFile = (file) => {
    const name = file.metadata.name;
    const fileRef = ref(storage, `files/${name}`);
    deleteObject(fileRef)
      .then(() => {
        const files = filesData.filter((el) => el.url !== file.url);
        setFilesData(files);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h2 className="mb-5">
        {filesData.length
          ? "Add memories to your story"
          : "Start by adding some memories"}
      </h2>

      {isFilesLoaded ? (
        <div className="flex mt-10 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-6">
            <div className="border-2 rounded-lg border-indigo-800 flex justify-center items-center hover:bg-blue-100 duration-300 ease-out-expo relative space-x-2">
              {isUpload || files.length ? (
                <>
                  <ButtonPrimary
                    xClass={"px-4 flex-shrink-0"}
                    handleClick={handleUpload}
                    type={"button"}
                  >
                    <IoCloudUploadOutline size={18} />
                    <span className="">
                      {`Upload ${files.length} file${
                        files.length > 1 ? "s" : ""
                      } `}
                    </span>
                  </ButtonPrimary>
                  <ButtonPrimary
                    xClass={"bg-transparent"}
                    handleClick={handleCancel}
                    type={"button"}
                  >
                    <MdOutlineCancel size={30} className={"text-indigo-800"} />
                  </ButtonPrimary>
                  <Loader percent={percent} />
                </>
              ) : (
                <>
                  <label
                    htmlFor="file-upload"
                    role="upload"
                    className="w-full h-full flex justify-center items-center cursor-pointer"
                  >
                    <Icon
                      icon="add"
                      size={35}
                      xClass="text-indigo-800 cursor-pointer"
                    />
                  </label>
                  <input
                    className="hidden"
                    id="file-upload"
                    type="file"
                    multiple="multiple"
                    ref={inputFileRef}
                    onChange={handleChange}
                    accept=".png, .jpeg, video/*"
                  />
                </>
              )}
            </div>

            {filesData
              .sort(
                (a, b) =>
                  b?.metadata?.customMetadata?.originalDate -
                  a?.metadata?.customMetadata?.originalDate
              )
              .map((file, i) => {
                return <FileCard file={file} key={i} deleteFile={deleteFile} />;
              })}
          </div>
          {/* TODO */}
          {/* <Timeline files={filesData} /> */}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center min-h-300">
          <CgSpinner className="animate-spin" color={"dodgerblue"} size={40} />
        </div>
      )}
    </>
  );
};

export default FileOperations;
