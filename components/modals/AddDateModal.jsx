import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import Calendar from "react-calendar";
import ModalTitle from "../text/ModalTitle";
import { useMyFirst } from "../../context/MyFirstContext";
import { useBabies } from "../../context/BabiesContext";

const AddDateModal = ({ id, setShowAddMyFirstModal, isFirstField }) => {
  const [showModal, setShowModal] = useState(false);
  const { date, onChange, setId, setIsReadyToUpload } = useMyFirst();
  const { babyData } = useBabies();

  const minDate = new Date(babyData.date.seconds * 1000);

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
          setId(id);
          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className={`${
          isFirstField ? "self-start" : ""
        } border-2 flex-shrink-0 group w-8 h-8 rounded-lg border-indigo-800 flex justify-center items-center duration-300 ease-out-expo relative space-x-2`}
        type="button"
      >
        <Icon
          icon={"add"}
          xClass={
            "text-indigo-800 scale-75 group-hover:scale-100 duration-300 "
          }
          size={50}
        />
      </button>
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
                  <ModalTitle title="Add a date" />
                  <button
                    onClick={() => {
                      setShowModal(false);
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
                <div className="rounded-lg border-indigo-800 border-[1px] overflow-hidden mt-3">
                  <Calendar
                    value={date}
                    minDate={minDate}
                    onClickDay={(value) => {
                      setIsReadyToUpload(true);
                      onChange(value);
                      setShowModal(false);
                      setShowAddMyFirstModal(false);
                    }}
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

export default AddDateModal;
