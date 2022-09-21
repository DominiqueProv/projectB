import Image from "next/image";

const MediasFull = ({ file }) => {
  const type = file.metadata.contentType;
  const regex = new RegExp("video");
  const isVideo = regex.test(type);
  if (isVideo) {
    return (
      <video className="object-fill" autoPlay muted loop>
        <source src={file?.url} type="video/mp4" />
      </video>
    );
  } else {
    return (
      file.url && (
        <div className="relative rounded-md overflow-hidden">
          <img
            src={file.url}
            alt={file.name}
            className="object-contain w-full lg:h-[calc(90vh-92px)]"
          />
        </div>
      )
    );
  }
};

export default MediasFull;
