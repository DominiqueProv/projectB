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
        <Image
          layout="fill"
          sizes="100vw"
          quality={70}
          objectFit="contain"
          priority
          src={file.url}
          alt={file.name}
        />
      )
    );
  }
};

export default MediasFull;
