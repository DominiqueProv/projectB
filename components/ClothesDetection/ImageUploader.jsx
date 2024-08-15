import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        onImageUpload(reader.result); // Pass the image data to the parent component
      };

      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg", // Accept JPG, JPEG, and PNG files
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-lg text-center aspect-square justify-center items-center flex cursor-pointer font-bold text-xl ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag &apos;n&apos; drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageUploader;
