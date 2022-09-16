import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Icon from "../buttons/Icon";
import MediasFull from "../MediasFull";
import Modal from "./Modal";
import { Loader } from "../Loader";

const FileModal = ({ file, notes }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonSecondary
        handleClick={() => {
          setShowModal(!showModal);
        }}
        xClass={
          "rounded-full absolute bg-opacity-70 bottom-2 right-2 z-10 p-2 font-bold text-xs hover:bg-opacity-100 duration-300 ease-out-expo"
        }
      >
        <Icon
          icon={"expand"}
          xClass={"text-indigo-800 hover:scale-125 duration-200 "}
          size={20}
        />
      </ButtonSecondary>
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
                      {Object.keys(notes).length > 0 && (
                        <ul className="font-semibold bg-blue-100 bg-opacity-70 rounded-lg p-4 sm:w-[400px]">
                          <li>
                            <span>{notes.description}</span>
                          </li>
                          <li>
                            <span>{notes.mood}</span>
                          </li>
                          <li>
                            <span>{notes.height}</span>
                          </li>
                          <li>
                            <span>{notes.weigth}</span>
                          </li>
                        </ul>
                      )}
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
