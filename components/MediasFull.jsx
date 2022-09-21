import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Video from "./medias/Video";

const MediasFull = ({ file }) => {
  const type = file.metadata.contentType;
  const regex = new RegExp("video");
  const isVideo = regex.test(type);
  const [loaded, setLoaded] = useState(false);

  if (isVideo) {
    return (
      <div
        className={`w-full lg:h-[calc(90vh-92px)] flex items-center relative rounded-md overflow-hidden bg-slate-800`}
      >
        <Video
          file={file}
          loaded
          loaderHeight={"aspect-square lg:h-[calc(90vh-92px)]"}
        />
      </div>
    );
  } else {
    return (
      file.url && (
        <>
          {loaded ? (
            <>
              <img
                src={file.url}
                alt={file.name}
                className="absolute inset-0 object-cover blur-md hidden lg:block w-full"
              />
              <div className="bg-slate-500 inset-0 absolute opacity-50 hidden lg:block"></div>
            </>
          ) : (
            <div className="w-full flex justify-center items-center lg:h-[calc(90vh-92px)]">
              <CgSpinner
                className="animate-spin"
                color={"dodgerblue"}
                size={40}
              />
            </div>
          )}
          <div className="relative rounded-md overflow-hidden">
            <img
              src={file.url}
              alt={file.name}
              className={`object-contain w-full lg:h-[calc(90vh-92px)] ${
                loaded ? "block" : "hidden"
              }`}
              onLoad={() => setLoaded(true)}
            />
          </div>
        </>
      )
    );
  }
};

export default MediasFull;
