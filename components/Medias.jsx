import Image from "next/image";

const Medias = ({ file }) => {
  const type = file.metadata.contentType;
  const regex = new RegExp("video");
  const isVideo = regex.test(type);
  if (isVideo) {
    return (
      <video className="object-fill" autoPlay muted loop>
        <source src={file.url} type="video/mp4" />
      </video>
    );
  } else {
    return (
      <Image layout="fill" objectFit="cover" src={file.url} alt={file.name} />
    );
  }
};

export default Medias;
