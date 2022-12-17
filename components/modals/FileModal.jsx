import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import MediasFull from "../MediasFull";
import Modal from "./Portal";
import DeleteMemoryModal from "./DeleteMemoryModal";
import NotesModal from "./NotesModal";
import FileModalSideInfo from "./FileModalSideInfo";
import ModalTitle from "../text/ModalTitle";

const FileModal = ({ file, index }) => {
  const [showModal, setShowModal] = useState(false);
  const notes = file?.notes || [];
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className={"absolute inset-0 z-10"}
        type="button"
      >
        <div className="rounded-full bg-blue-100 opacity-0 absolute bottom-2 right-2 z-10 p-2 font-bold text-xs group-hover:opacity-100 group-hover:bg-opacity-70 duration-300 ease-out-expo">
          <Icon
            icon={"expand"}
            xClass={
              "text-indigo-800 scale-75 group-hover:scale-100 duration-300 "
            }
            size={20}
          />
        </div>
      </button>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => {
                setShowModal(false);
                document.body.style.overflow = "unset";
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] h-[90vh] sm:w-[80vw] rounded-lg p-3 relative flex-col bg-white overflow-auto lg:overflow-hidden pb-[85px]">
                <div className="flex justify-between items-center">
                  <ModalTitle title={notes?.title} />
                  <button
                    onClick={() => {
                      setShowModal(false);
                      document.body.style.overflow = "unset";
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
                <div className="flex flex-col lg:flex-row w-full gap-4 relative mt-4">
                  <div className="relative rounded-md lg:overflow-hidden w-full">
                    {file && <MediasFull file={file} />}
                  </div>
                  <div
                    className={`bg-blue-100 bg-opacity-70 rounded-lg p-2 lg:p-4 w-full lg:w-[320px] flex flex-col flex-shrink-0 justify-between ${
                      (Object.keys(notes).length === 2 && notes.title) ||
                      Object.keys(notes).length === 0
                        ? "hidden lg:flex"
                        : null
                    }`}
                  >
                    <FileModalSideInfo notes={notes} />
                    <div className="justify-between gap-3 hidden lg:flex">
                      <NotesModal isFileModal file={file} index={index} />
                      <DeleteMemoryModal
                        file={file}
                        setShowFileModal={setShowModal}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-3 p-3 fixed bottom-0 left-0 right-0 lg:hidden bg-slate-700/20 backdrop-blur">
                  <NotesModal isFileModal file={file} index={index} />
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
