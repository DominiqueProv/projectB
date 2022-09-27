import { useEffect } from "react";
import { useFiles } from "../context/FilesContext";
import FileCard from "./cards/FileCard";
import UploadButton from "./buttons/UploadButton";
import { useRouter } from "next/router";

const FileOperations = () => {
  const router = useRouter();
  const pid = router.query.id;
  const { filesData, getFiles } = useFiles();
  useEffect(() => {
    getFiles(pid);
  }, []);

  return (
    <>
      <h2 className="mb-5">
        {filesData.length
          ? "Add memories to your story"
          : "Start by adding some memories"}
      </h2>
      <div className="flex lg:mt-10 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-6">
          <UploadButton />
          {filesData
            ?.sort(
              (a, b) =>
                b?.metadata?.customMetadata?.originalDate -
                a?.metadata?.customMetadata?.originalDate
            )
            .map((file, i) => {
              return <FileCard file={file} key={i} index={i} />;
            })}
        </div>
      </div>
    </>
  );
};

export default FileOperations;
