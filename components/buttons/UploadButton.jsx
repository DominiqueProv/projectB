import { useState } from "react";
import Icon from "./Icon";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Loader from "../Loader";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import { useFiles } from "../../context/FilesContext";

const UploadButton = () => {
  const { files, setFiles, percent, filesData, putStorageItem } = useFiles();
  const [sources, setSources] = useState([]);

  const handleUploadFiles = () => {
    Promise.all(files.map((item) => putStorageItem(item)))
      .then(() => {
        setSources([]);
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
      });
  };

  const handleCancel = () => {
    setFiles([]);
    setSources([]);
  };

  function showPreview(e) {
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
  }

  const handleChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    const uploaded = [...files];
    chosenFiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setFiles(uploaded);
    showPreview(event);
  };

  return (
    <div
      className={`border-2 p-3 lg:aspect-auto w-full min-h-[120px] lg:h-full ${
        filesData.length ? "" : "lg:min-h-[170px] lg:aspect-video"
      } rounded-lg border-indigo-800 flex justify-between flex-col lg:items-center duration-300 ease-out-expo relative lg:space-x-2 ${
        !files.length ? "lg:hover:bg-blue-100" : ""
      }`}
    >
      {sources && (
        <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 mb-2">
          {sources.map((src) => {
            return src !== "video" ? (
              <img
                key={src}
                alt={""}
                src={src}
                className="aspect-square w-full object-cover overflow-hidden rounded-lg"
              />
            ) : (
              <div className="bg-slate-100 rounded-lg flex justify-center items-center">
                <BiCameraMovie className="w-[60%] h-[60%] text-indigo-400" />
              </div>
            );
          })}
        </div>
      )}
      {files.length ? (
        <div className="flex items-center gap-2">
          <ButtonPrimary
            xClass={"px-4 flex-shrink-0"}
            handleClick={handleUploadFiles}
            type={"button"}
            label={`Upload ${files.length} file${files.length > 1 ? "s" : ""} `}
          >
            <IoCloudUploadOutline size={18} />
          </ButtonPrimary>
          <button
            className="bg-slate-100 rounded-lg h-full aspect-square items-center flex justify-center"
            onClick={handleCancel}
            type={"button"}
          >
            <Icon
              icon={"delete"}
              size={30}
              xClass={"text-indigo-800 transform"}
            />
          </button>
          <Loader percent={percent} />
        </div>
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
