import { useState } from "react";
import Icon from "./Icon";
import ButtonPrimary from "./ButtonPrimary";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useBabies } from "../../context/BabiesContext";
import { useAuth } from "../../context/AuthContext";
import { storage, database } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

const UpdateMemberButton = ({ index }) => {
  const { babiesDataList, setBabiesDataList, setIsUpload } = useBabies();
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  const handleUploadFiles = async () => {
    if (!file) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const ext = compressedFile.name.split(".").pop();
      const fileRef = ref(
        storage,
        `${user.uid}/babiesAvatar/${babiesDataList[index].name}-${user.uid}.${ext}`
      );
      setIsUpload(true);

      const snapshot = await uploadBytes(fileRef, compressedFile);
      const photoURL = await getDownloadURL(fileRef);
      const babyRef = doc(database, user.uid, `${babiesDataList[index].id}`);

      await updateDoc(babyRef, {
        url: photoURL,
      });

      const newState = babiesDataList.map((obj, i) => {
        if (i === index) {
          return { ...obj, url: photoURL };
        }
        return obj;
      });

      setBabiesDataList(newState);
      setIsUpload(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUpload(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      console.error("Please select a valid image file.");
    }
  };

  return (
    <div
      className={`border group ${
        file ? "p-[2px]" : "p-[2px] sm:p-2"
      } absolute top-3 sm:top-auto sm:left-auto left-12 sm:relative sm:h-full rounded-full sm:rounded-lg border-indigo-800 text-sm bg-indigo-100 flex justify-center items-center ease-out-expo space-x-[2px] ${
        !file ? "lg:hover:bg-blue-100" : ""
      }`}
    >
      {file ? (
        <>
          <ButtonPrimary
            xClass="px-4 flex-shrink-0 bg-transparent !text-indigo-800 sm:hover:bg-indigo-200"
            handleClick={handleUploadFiles}
            type="button"
            label="Update"
          >
            <IoCloudUploadOutline size={18} />
          </ButtonPrimary>
          <button
            className="bg-transparent"
            onClick={handleCancel}
            type="button"
          >
            <Icon size={30} icon={"delete"} xClass="text-indigo-800 p-1.5" />
          </button>
        </>
      ) : (
        <>
          <label
            htmlFor={`file-upload-${index}`}
            role="upload"
            className="w-full h-full flex justify-center items-center cursor-pointer gap-2"
          >
            <span className="hidden sm:block flex-shrink-0 text-indigo-800">
              Update Avatar
            </span>
            <Icon
              icon="add"
              size={20}
              xClass="hidden sm:block text-indigo-800 group-hover:scale-125 duration-200"
            />
            <Icon
              icon="add"
              size={12}
              xClass="sm:hidden text-indigo-800 group-hover:scale-125 duration-200"
            />
          </label>
          <input
            className="hidden"
            id={`file-upload-${index}`}
            type="file"
            onChange={handleChange}
            accept=".png, .jpeg, .jpg" // Only accept image files
          />
        </>
      )}
    </div>
  );
};

export default UpdateMemberButton;
