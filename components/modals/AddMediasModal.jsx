import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import ModalTitle from "../text/ModalTitle";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Loader from "../Loader";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import { useFiles } from "../../context/FilesContext";

const AddMediasModal = () => {
  const {
    files,
    percent,
    isUpload,
    putStorageItem,
    handleCancelUpload,
    sources,
    setSources,
  } = useFiles({ setShowModal });
  const [showModal, setShowModal] = useState(false);

  const handleUploadFiles = () => {
    Promise.all(files.map((item) => putStorageItem(item, setShowModal)))
      .then(() => {
        setSources([]);
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
      });
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
              onClick={() => {
                setShowModal(false);
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <ModalTitle title="Add medias" />
                  <button
                    onClick={() => {
                      handleCancelUpload(setShowModal);
                    }}
                    className="bg-blue-200 self-end z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                    type="button"
                  >
                    <IoMdClose
                      size={25}
                      className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
                    />
                  </button>
                </div>
                {!!sources && (
                  <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 mt-4">
                    {sources.map((src) => {
                      return src !== "video" ? (
                        <div className="aspect-square w-full overflow-hidden rounded-lg">
                          <img
                            key={src}
                            alt={""}
                            src={src}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-slate-100 rounded-lg flex justify-center items-center">
                          <BiCameraMovie className="w-[60%] h-[60%] text-indigo-400" />
                        </div>
                      );
                    })}
                  </div>
                )}
                {!!files.length && (
                  <div>
                    <div className="mb-3 flex items-center gap-2 mt-4">
                      <ButtonPrimary
                        xClass={"px-4 flex-shrink-0 w-1/2"}
                        handleClick={handleUploadFiles}
                        isUpload={isUpload}
                        type={"button"}
                        label={`Upload ${files.length} file${
                          files.length > 1 ? "s" : ""
                        } `}
                      >
                        <IoCloudUploadOutline size={18} />
                      </ButtonPrimary>
                      <ButtonPrimary
                        xClass={"px-4 bg-red-500 flex-grow w-1/2"}
                        type={"button"}
                        label={"Cancel"}
                        handleClick={() => handleCancelUpload(setShowModal)}
                      />
                    </div>
                    <Loader percent={percent} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddMediasModal;
