import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import MediasFull from "../MediasFull";
import Modal from "./Portal";
import DeleteMemoryModal from "./DeleteMemoryModal";
import FileModalSideInfo from "./FileModalSideInfo";
import EditableField from "../text/EditableField";
import Medias from "../Medias";

const FileModal = ({ file, index }) => {
  const [showModal, setShowModal] = useState(false);
  const notes = file?.notes || [];

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.keyCode === 27) setShowModal(false);
    };
    window.addEventListener("keydown", closeOnEscapeKey);
    return () => window.removeEventListener("keydown", closeOnEscapeKey);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="absolute inset-0 z-10"
        type="button"
      />
      {file && <Medias file={file} />}
      <Modal>
        {showModal && (
          <>
            <div
              onClick={handleCloseModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] h-[90vh] sm:w-[80vw] rounded-lg p-3 relative flex-col bg-white overflow-auto lg:overflow-hidden pb-[85px]">
                <div className="flex justify-between items-center">
                  <EditableField
                    file={file}
                    fileIndex={index}
                    noteValue={notes.title}
                    isTitle
                    noteType="title"
                  />
                  <button
                    onClick={handleCloseModal}
                    className="bg-blue-200 self-start flex-shrink-0 z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                    type="button"
                  >
                    <IoMdClose
                      size={25}
                      className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
                    />
                  </button>
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-4 relative mt-4">
                  <div className="relative rounded-md lg:overflow-hidden w-full">
                    {file && <MediasFull file={file} />}
                  </div>
                  <div
                    className={
                      "bg-blue-100 bg-opacity-70 rounded-lg p-2 lg:p-4 w-full lg:w-[320px] flex-col flex-shrink-0 justify-between flex"
                    }
                  >
                    <FileModalSideInfo file={file} fileIndex={index} />
                    <div className="justify-end gap-3 hidden lg:flex">
                      <DeleteMemoryModal
                        file={file}
                        setShowFileModal={setShowModal}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-3 p-3 fixed bottom-0 left-0 right-0 lg:hidden bg-white/30 backdrop-blur-lg">
                  <DeleteMemoryModal
                    file={file}
                    setShowFileModal={setShowModal}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default FileModal;
