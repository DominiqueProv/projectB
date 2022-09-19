import { useEffect } from "react";
import { useFiles } from "../context/FilesContext";
import FileCard from "./cards/FileCard";
import { CgSpinner } from "react-icons/cg";
import UploadButton from "./buttons/UploadButton";

const FileOperations = () => {
  const { filesData, getFiles, isFilesLoaded } = useFiles();

  useEffect(() => {
    getFiles();
  }, []);

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
            <UploadButton />
            {filesData
              .sort(
                (a, b) =>
                  b?.metadata?.customMetadata?.originalDate -
                  a?.metadata?.customMetadata?.originalDate
              )
              .map((file, i) => {
                console.log(file);
                return <FileCard file={file} key={i} index={i} />;
              })}
          </div>
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
