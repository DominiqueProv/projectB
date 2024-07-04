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
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import imageCompression from "browser-image-compression";

const FilesContext = createContext({});
export const useFiles = () => useContext(FilesContext);

const ffmpeg = createFFmpeg({ log: true });

const FilesContextProvider = ({ children }) => {
  const router = useRouter();
  const pid = router?.query?.id;
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [uploadTask, setUploadTask] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [percent, setPercent] = useState(0);
  const [notesInput, setNotesInput] = useState([]);
  const [sources, setSources] = useState([]);
  const [totalPercent, setTotalPercent] = useState(0);

  const notifyDelete = () => toast.success("File deleted");
  const notifyUpload = () => toast.success("Upload successful");
  const notifyCancelled = () => toast.success("Upload cancelled");

  const showPreview = (e) => {
    if (e.target.files.length > 0) {
      Object.entries(e.target.files).forEach((file) => {
        const [_, value] = file;
        if (value.type === "video/quicktime") {
          setSources((prev) => [...prev, "video"]);
        } else {
          const src = URL.createObjectURL(value);
          setSources((prev) => [...prev, src]);
        }
      });
    }
  };

  const handleChange = async (event) => {
    const chosenFiles = Array.from(event.target.files);
    const uploaded = [...files];
    const compressedFiles = await Promise.all(
      chosenFiles.map(async (file) => {
        if (file.type.startsWith("image/")) {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          };
          try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
          } catch (error) {
            console.error("Compression Error:", error);
            return file;
          }
        } else if (file.type.startsWith("video/")) {
          if (file.size > 5 * 1024 * 1024) {
            // 5MB
            if (!ffmpeg.isLoaded()) await ffmpeg.load();
            ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));
            await ffmpeg.run("-i", "input.mp4", "-b:v", "1M", "output.mp4");
            const data = ffmpeg.FS("readFile", "output.mp4");
            const fileName = file.name.split(".")[0] + "_compressed.mp4";
            const compressedFile = new File([data.buffer], fileName, {
              type: "video/mp4",
            });
            return compressedFile;
          }
        }
        return file;
      })
    );
    compressedFiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setFiles(uploaded);
    showPreview(event);
    event.target.value = null;
  };

  const handleCancelUpload = (setShowModal) => {
    if (isUpload && uploadTask) {
      uploadTask.cancel();
      setUploadTask(null);
      setIsUpload(false);
      setIsSuccess(false);
      setPercent(0);
      notifyCancelled();
    }
    setFiles([]);
    setSources([]);
    setShowModal(false);
  };

  const putStorageItem = (item, setShowModal, totalFiles) => {
    const ext = item.name.split(".").pop();
    const metadata = {
      customMetadata: {
        originalDate: `${item.lastModified.toString()}`,
      },
    };
    const storageRef = ref(storage, `${user.uid}/${pid}/${v4()}.${ext}`);
    const uploadTaskRef = uploadBytesResumable(storageRef, item);
    setUploadTask(uploadTaskRef);
    setIsUpload(true);
    let currentProgress = 0;
    uploadTaskRef.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
        currentProgress = percent;
        const overallPercent =
          percent / totalFiles + (totalPercent / totalFiles) * (totalFiles - 1);
        setTotalPercent(overallPercent);
      },
      (err) => console.error(err.message),
      async () => {
        setIsSuccess(true);
        setShowModal(false);
        notifyUpload();
        const url = await getDownloadURL(uploadTaskRef.snapshot.ref);
        const data = { url };
        await updateMetadata(storageRef, metadata);
        const metadataObj = await getMetadata(storageRef);
        data.metadata = metadataObj;
        const note = await getNote(metadataObj.name.split(".")[0]);
        data.notes = note;
        setFilesData((prev) => [...prev, data]);
        setFiles([]);
        setIsUpload(false);
        setIsSuccess(false);
        setTotalPercent(0);
      }
    );
  };

  const getFiles = (pid) => {
    const listImagesRef = ref(storage, `${user.uid}/${pid}`);
    listAll(listImagesRef)
      .then((res) => {
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          const note = await getNote(metadata.name.split(".")[0]);
          const data = { url, metadata, notes: note };
          setFilesData((prev) => [...prev, data]);
        });
      })
      .catch((error) => {
        console.error("Get Files Error:", error);
      });
  };

  const deleteFile = async (file) => {
    const fileRefName = file.metadata.name.split(".")[0];
    const fileRef = ref(storage, `${user.uid}/${pid}/${file.metadata.name}`);
    try {
      await deleteObject(fileRef);
      const filesURL = filesData.filter((el) => el.url !== file.url);
      setFilesData(filesURL);
      await deleteDoc(doc(database, `${user.uid}/${pid}/notes/${fileRefName}`));
      notifyDelete();
    } catch (error) {
      console.error("Delete File Error:", error);
    }
  };

  const getNote = async (file) => {
    const docRef = doc(database, `${user.uid}/${pid}/notes/${file}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  };

  return (
    <FilesContext.Provider
      value={{
        pid,
        files,
        filesData,
        isUpload,
        isSuccess,
        percent,
        totalPercent,
        notesInput,
        getFiles,
        setFiles,
        setFilesData,
        deleteFile,
        putStorageItem,
        getNote,
        setNotesInput,
        handleCancelUpload,
        sources,
        setSources,
        handleChange,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContextProvider;
