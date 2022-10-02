import { useRef } from "react";
import Icon from "./Icon";

import ButtonPrimary from "../buttons/ButtonPrimary";
import Loader from "../Loader";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useFiles } from "../../context/FilesContext";

const UploadButton = () => {
  const { files, setFiles, percent, filesData, putStorageItem } = useFiles();

  const handleUploadFiles = () => {
    Promise.all(files.map((item) => putStorageItem(item)))
      .then(() => {
        console.log(`All success`);
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
      });
  };

  const handleCancel = () => {
    setFiles([]);
  };

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

  return (
    <div
      className={`border-2 p-3 lg:aspect-auto w-full h-[120px] lg:h-full ${
        filesData.length ? "" : "lg:min-h-[170px] lg:aspect-video"
      } rounded-lg border-indigo-800 flex justify-center items-center duration-300 ease-out-expo relative space-x-2 ${
        !files.length ? "lg:hover:bg-blue-100" : ""
      }`}
    >
      {files.length ? (
        <>
          <ButtonPrimary
            xClass={"px-4 flex-shrink-0"}
            handleClick={handleUploadFiles}
            type={"button"}
            label={`Upload ${files.length} file${files.length > 1 ? "s" : ""} `}
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
          <Loader percent={percent} />
        </>
      ) : (
        <>
          <label
            htmlFor="file-upload"
            role="upload"
            className="w-full h-full flex justify-center items-center cursor-pointer group"
          >
            <Icon
              icon="add"
              size={40}
              xClass="text-indigo-800 cursor-pointer group-hover:scale-125 duration-200"
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

export default UploadButton;
