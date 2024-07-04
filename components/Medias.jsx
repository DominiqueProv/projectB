import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Video from "./medias/Video";

const Medias = ({ file }) => {
  const type = file.metadata.contentType;
  const isVideo = type.includes("video");
  const [loaded, setLoaded] = useState(false);

  if (isVideo) {
    return (
      <div className="relative rounded-t-lg overflow-hidden aspect-card ">
        <Video
          file={file}
          loaded
          loaderHeight={"aspect-square lg:aspect-video"}
        />
      </div>
    );
  } else {
    return (
      file?.url && (
        <>
          {loaded ? null : (
            <div className="w-full flex justify-center items-center aspect-square lg:aspect-video">
              <CgSpinner
                className="animate-spin"
                color="dodgerblue"
                size={40}
              />
            </div>
          )}
          <div className="relative rounded-t-lg overflow-hidden aspect-card ">
            <img
              src={file.url}
              alt={file.name}
              className={`object-cover w-full h-full scale-110 ${
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

export default Medias;
