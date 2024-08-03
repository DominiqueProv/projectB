import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import ModalTitle from "../text/ModalTitle";

const AddFirstTimesModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          if (typeof window !== "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className={"flex items-center gap-3 group"}
        type="button"
      >
        <span className="font-medium text-blue-500">Create your own</span>
        <div className="border-2 group h-10 aspect-square rounded-lg bg-blue-50 border-blue-500 flex justify-center items-center duration-300 ease-out-expo relative">
          <Icon
            icon={"add"}
            xClass={"text-blue-500 scale-75 group-hover:scale-90 duration-300 "}
            size={50}
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
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90vw] lg:max-w-[80vw]">
              <div className="flex w-full rounded-lg relative flex-col bg-white max-h-[80vh]">
                <div className="flex justify-between items-center p-3 border-b border-gray-200">
                  <ModalTitle title="Add a custom first time" />
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
                Content - input field to add the name max 80 char. - calendar
                button to add a date - save button to complete the action
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddFirstTimesModal;
