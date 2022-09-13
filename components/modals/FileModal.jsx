import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Icon from "../buttons/Icon";
import MediasFull from "../MediasFull";
import Modal from "./Modal";
import { Loader } from "../Loader";

import { doc, getDoc } from "firebase/firestore";
import { database } from "../../lib/firebase";

const FileModal = ({ file }) => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState({});

  const getNote = async () => {
    const fileRefName = file.metadata.name.split(".")[0];
    const docRef = doc(database, `notes/${fileRefName}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setNotes({ ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
  };

  return (
    <>
      <ButtonSecondary
        handleClick={() => {
          setShowModal(!showModal);
          getNote();
        }}
        xClass={
          "rounded-full absolute bg-opacity-70 top-1 right-1 z-10 p-2 font-bold text-xs opacity-0 group-hover:opacity-100 hover:bg-opacity-100 duration-300 ease-out-expo"
        }
      >
        <Icon icon={"expand"} xClass={"text-blue-500"} size={15} />
      </ButtonSecondary>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => setShowModal(false)}
              className={`inset-0 absolute bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="flex justify-center items-center absolute z-40 inset-0">
              <div className="flex w-full h-full max-h-[80vh] sm:max-w-[80vw] rounded-lg p-3 relative flex-col bg-white">
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
                <h3 className="text-3xl font-semibold">File Info</h3>
                <div className="flex w-full h-full gap-2">
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    {file && <MediasFull file={file} />}
                  </div>
                  {notes ? (
                    <ul className="min-w-[200px]">
                      {Object.entries(notes).map((entry, i) => {
                        return (
                          <li className="font-semibold" key={i}>
                            <span className="uppercase text-xs">
                              {entry[0]}:
                            </span>
                            <span className="">
                              {entry[1]}
                              {entry[0] === "height"
                                ? "cm"
                                : entry[0] === "weigth"
                                ? "kg"
                                : ""}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <Loader />
                  )}
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
