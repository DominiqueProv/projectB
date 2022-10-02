import { useState } from "react";
import Icon from "./Icon";
import ButtonPrimary from "./ButtonPrimary";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useBabies } from "../../context/BabiesContext";
import { storage } from "../../lib/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const UpdateMemberButton = ({ index }) => {
  const { babiesDataList, setBabiesDataList } = useBabies();
  const [file, setFile] = useState([]);

  const handleUploadFiles = async () => {
    const ext = file[0].name.split(".").pop();
    const fileRef = ref(storage, `${user.uid}/userAvatar/${user.uid}.${ext}`);
    setIsUpload(true);
    const snapshot = await uploadBytes(fileRef, file[0]);
    const photoURL = await getDownloadURL(fileRef);
    updateUser(user.userName, photoURL);
    setIsUpload(false);
  };

  const handleCancel = () => {
    setFile([]);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  return (
    <div
      className={`border-2 group ${
        file.length ? "p-[2px]" : "p-2"
      } h-full rounded-lg border-indigo-800 flex justify-center items-center ease-out-expo relative space-x-[2px] ${
        !file.length ? "lg:hover:bg-blue-100" : ""
      }`}
    >
      {file.length ? (
        <>
          <ButtonPrimary
            xClass={`px-4 flex-shrink-0`}
            handleClick={handleUploadFiles}
            type={"button"}
            label="Upload"
          >
            <IoCloudUploadOutline size={18} />
          </ButtonPrimary>
          <button
            className="bg-transparent"
            onClick={handleCancel}
            type={"button"}
          >
            <MdOutlineCancel size={30} className={"text-indigo-800"} />
          </button>
        </>
      ) : (
        <>
          <label
            htmlFor="file-upload"
            role="upload"
            className="w-full h-full flex justify-center items-center cursor-pointer group gap-2"
          >
            <span className="flex-shrink-0 text-indigo-800 font-semibold">
              Update Avatar
            </span>

            <Icon
              icon="add"
              size={25}
              xClass="text-indigo-800 group-hover:scale-125 duration-200"
            />
          </label>
          <input
            className="hidden"
            id="file-upload"
            type="file"
            multiple="multiple"
            onChange={handleChange}
            accept=".png, .jpeg, video/*"
          />
        </>
      )}
    </div>
  );
};

export default UpdateMemberButton;
