import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Icon from "../buttons/Icon";
import MediasFull from "../MediasFull";

const FileModal = ({ file }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonSecondary
        className="font-bold text-xs"
        handleClick={() => setShowModal(!showModal)}
        xClass={"rounded-full bg-transparent"}
      >
        <Icon icon={"expand"} xClass={"text-blue-500"} />
      </ButtonSecondary>

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
              <div className="flex w-full h-full">
                <div className="relative w-full h-full rounded-md overflow-hidden">
                  {file && <MediasFull file={file} />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FileModal;
