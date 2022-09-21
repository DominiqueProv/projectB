import { CgSpinner } from "react-icons/cg";

const Video = ({ file, loaded, loaderHeight }) => {
  return (
    <>
      {loaded ? null : (
        <div
          className={`w-full flex justify-center items-center ${loaderHeight}`}
        >
          <CgSpinner className="animate-spin" color={"dodgerblue"} size={40} />
        </div>
      )}
      <video
        className={`object-fill  ${loaded ? "block" : "hidden"}`}
        autoPlay
        muted
        loop
        controls
      >
        <source src={file?.url} type="video/mp4" />
      </video>
    </>
  );
};

export default Video;
