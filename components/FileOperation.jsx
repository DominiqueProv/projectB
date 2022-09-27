import { useEffect } from "react";
import { useFiles } from "../context/FilesContext";
import FileCard from "./cards/FileCard";
import UploadButton from "./buttons/UploadButton";
import { useRouter } from "next/router";

const FileOperations = () => {
  const { filesData, getFiles } = useFiles();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (!id) return null;
      getFiles(id);
    }
  }, [router.isReady]);

  return (
    <section className="mt-10">
      <h2 className="mb-5">
        {filesData.length
          ? "Add memories to your story"
          : "Start by adding some memories"}
      </h2>
      <div className="flex lg:mt-10 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-6">
          <UploadButton />
          {filesData
            ? filesData
                .sort(
                  (a, b) =>
                    b?.metadata?.customMetadata?.originalDate -
                    a?.metadata?.customMetadata?.originalDate
                )
                .map((file, i) => {
                  return <FileCard file={file} key={i} index={i} />;
                })
            : null}
        </div>
      </div>
    </section>
  );
};

export default FileOperations;
