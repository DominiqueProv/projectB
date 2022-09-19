import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import MediasFull from "../MediasFull";
import Modal from "./Modal";
import { Loader } from "../Loader";
import DeleteModal from "../modals/DeleteModal";
import NotesModal from "./NotesModal";

const FileModal = ({ file, notes, deleteFile, getNote }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getNote(file);
  }, []);
  return (
    <>
      <button
        onClick={() => {
          setShowModal(!showModal);
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
        {showModal && notes && (
          <>
            <div
              onClick={() => setShowModal(false)}
              className={`inset-0 absolute bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="flex justify-center items-center absolute z-40 inset-0">
              <div className="flex h-full w-[90vw] max-h-[80vh] sm:w-[80vw] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-semibold mt-4">{notes.title}</h3>
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className="bg-blue-200 self-end z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                    type="button"
                  >
                    <IoMdClose
                      size={25}
                      className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
                    />
                  </button>
                </div>
                {notes && file ? (
                  <>
                    <div className="flex w-full h-full gap-2 relative mt-4">
                      <div className="relative rounded-md overflow-hidden w-full h-full">
                        <img
                          src={file.url}
                          alt={file.name}
                          className="absolute inset-0 object-cover blur-md"
                        />
                        <div className="bg-slate-500 inset-0 absolute opacity-50"></div>
                        {file && <MediasFull file={file} />}
                      </div>
                      <div className="bg-blue-100 bg-opacity-70 rounded-lg p-4 sm:w-[400px] flex flex-col justify-between">
                        <ul>
                          {Object.keys(notes).length > 0 && (
                            <>
                              {notes.description && (
                                <li>
                                  <span>{notes.description}</span>
                                </li>
                              )}
                              {notes.location && (
                                <li>
                                  <span>{notes.location}</span>
                                </li>
                              )}
                              {notes.mood && (
                                <li>
                                  <span>{notes.mood}</span>
                                </li>
                              )}
                              {notes.height && (
                                <li>
                                  <span>{notes.height} cm</span>
                                </li>
                              )}
                              {notes.weight && (
                                <li>
                                  <span>{notes.weight} kg</span>
                                </li>
                              )}
                            </>
                          )}
                        </ul>
                        <div className="flex justify-between gap-3">
                          <NotesModal file={file} notes={notes} isFileModal />
                          <DeleteModal
                            deleteFile={deleteFile}
                            file={file}
                            setShowFileModal={setShowModal}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default FileModal;
