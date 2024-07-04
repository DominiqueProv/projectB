import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import Modal from "./Portal";
import ModalTitle from "../text/ModalTitle";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Loader from "../Loader";
import { useFiles } from "../../context/FilesContext";

const AddMediasModal = () => {
  const {
    files,
    totalPercent,
    isUpload,
    putStorageItem,
    handleCancelUpload,
    sources,
    setSources,
  } = useFiles({ setShowModal });
  const [showModal, setShowModal] = useState(false);

  const handleUploadFiles = async () => {
    try {
      await Promise.all(
        files.map((item) => putStorageItem(item, setShowModal, files.length))
      );
      setSources([]);
    } catch (error) {
      console.error("Some files failed to upload:", error.message);
    }
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    if (sources.length > 0) {
      setShowModal(true);
    }
  }, [sources]);

  return (
    <>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            />
            <div className="fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[420px] rounded-lg p-3 bg-white flex flex-col">
              <div className="flex justify-between items-center">
                <ModalTitle title="Add medias" />
                <button
                  onClick={() => handleCancelUpload(setShowModal)}
                  className="bg-blue-200 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                  type="button"
                >
                  <IoMdClose
                    size={25}
                    className="text-indigo-800 hover:rotate-90 ease-out-expo duration-200"
                  />
                </button>
              </div>
              {sources.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {sources.map((src, index) =>
                    src !== "video" ? (
                      <div
                        key={index}
                        className="aspect-square w-full overflow-hidden rounded-lg"
                      >
                        <img
                          src={src}
                          alt="uploaded media"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="bg-slate-100 rounded-lg flex justify-center items-center"
                      >
                        <BiCameraMovie className="w-3/5 h-3/5 text-indigo-400" />
                      </div>
                    )
                  )}
                </div>
              )}
              {files.length > 0 && (
                <div className="mt-4">
                  <div className="mb-3 flex items-center gap-2">
                    <ButtonPrimary
                      xClass="px-4 flex-shrink-0 w-1/2"
                      handleClick={handleUploadFiles}
                      isUpload={isUpload}
                      type="button"
                      label={`Upload ${files.length} file${
                        files.length > 1 ? "s" : ""
                      }`}
                    >
                      <IoCloudUploadOutline size={18} />
                    </ButtonPrimary>
                    <ButtonPrimary
                      xClass="px-4 bg-red-500 flex-grow w-1/2"
                      type="button"
                      label="Cancel"
                      handleClick={() => handleCancelUpload(setShowModal)}
                    />
                  </div>
                  <Loader percent={totalPercent} />
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddMediasModal;
