import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Video from "./medias/Video";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

const Medias = ({ file }) => {
  const type = file.metadata.contentType;
  const regex = new RegExp("video");
  const isVideo = regex.test(type);
  const [loaded, setLoaded] = useState(false);

  if (isVideo) {
    return (
      <Video
        file={file}
        loaded
        loaderHeight={"aspect-square lg:aspect-video"}
      />
    );
  } else {
    return (
      file?.url && (
        <>
          {loaded ? null : (
            <div className="w-full flex justify-center items-center aspect-square lg:aspect-video">
              <CgSpinner
                className="animate-spin"
                color={"dodgerblue"}
                size={40}
              />
            </div>
          )}
          <div className="relative rounded-t-md overflow-hidden aspect-card ">
            <MouseParallaxChild factorX={0.1} factorY={0.1}>
              <img
                src={file.url}
                alt={file.name}
                className={`object-cover w-full h-full scale-110 ${
                  loaded ? "block" : "hidden"
                }`}
                onLoad={() => setLoaded(true)}
              />
            </MouseParallaxChild>
          </div>
        </>
      )
    );
  }
};

export default Medias;
