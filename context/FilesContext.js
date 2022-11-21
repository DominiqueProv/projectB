import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { database, storage } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  updateMetadata,
  listAll,
  deleteObject,
} from "firebase/storage";

const FilesContext = createContext({});
export const useFiles = () => useContext(FilesContext);

const FilesContextProvider = ({ children }) => {
  const router = useRouter();
  const pid = router?.query?.id;
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [uploadTask, setUploadTask] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [percent, setPercent] = useState(0);
  const [notesInput, setNotesInput] = useState([]);
  let listImagesRef = ref(storage, `${user.uid}/${pid}`);

  const notify = () => toast.success("File deleted");

  const putStorageItem = (item) => {
    const ext = item.name.split(".").pop();
    const metadata = {
      customMetadata: {
        originalDate: `${item?.lastModified?.toString()}`,
      },
    };
    const storageRef = ref(storage, `${user.uid}/${pid}/${v4()}.${ext}`);
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
        getNote(data?.metadata?.name.split(".")[0])
          .then((note) => (data.notes = note))
          .catch((error) => console.log(error.message));

        setFiles([]);
        setIsUpload(false);
      }
    );
  };

  const getFiles = () => {
    listAll(listImagesRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const data = {};
          getDownloadURL(itemRef).then((url) => {
            data.url = url;
          });
          getMetadata(itemRef)
            .then((metadata) => {
              data.metadata = metadata;
              getNote(data?.metadata?.name.split(".")[0])
                .then((note) => {
                  data.notes = note;
                  setFilesData((prev) => [...prev, data]);
                })
                .catch((error) => console.log(error.message));
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

  const deleteFile = async (file) => {
    const fileRefName = file.metadata.name.split(".")[0];
    const name = file.metadata.name;
    const fileRef = ref(storage, `${user.uid}/${pid}/${name}`);
    deleteObject(fileRef)
      .then(() => {
        const filesURL = filesData.filter((el) => el.url !== file.url);
        setFilesData(filesURL);
        notify();
      })
      .catch((error) => {
        console.log(error);
      });
    await deleteDoc(doc(database, `${user.uid}/${pid}/notes/${fileRefName}`));
  };

  const getNote = async (file) => {
    const docRef = doc(database, `${user.uid}/${pid}/notes/${file}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  return (
    <FilesContext.Provider
      value={{
        pid,
        files,
        filesData,
        isUpload,
        percent,
        notesInput,
        getFiles,
        setFiles,
        setFilesData,
        deleteFile,
        putStorageItem,
        getNote,
        setNotesInput,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContextProvider;
