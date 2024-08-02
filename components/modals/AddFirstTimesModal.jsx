import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import ModalTitle from "../text/ModalTitle";
import { useMyFirst } from "../../context/MyFirstContext";
import { useBabies } from "../../context/BabiesContext";
import MyFirstField from "../MyFirstsTimes/MyFirstField";

const AddFirstTimesModal = ({ myFirstfields }) => {
  const [showModal, setShowModal] = useState(false);
  const { date, onChange, setId, setIsReadyToUpload } = useMyFirst();
  const { babyData } = useBabies();

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
          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className={
          "border-2 p-1 group w-12 h-12 rounded-lg border-indigo-800 flex justify-center items-center duration-300 ease-out-expo relative space-x-2"
        }
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
              <div className="flex w-[90vw] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <ModalTitle title="Add a first time" />
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
                <div className="grid lg:grid-cols-4 gap-4 pt-8">
                  {myFirstfields.map((item, index) => (
                    <MyFirstField
                      key={item.id}
                      item={item}
                      index={index}
                      setShowAddMyFirstModal={setShowModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddFirstTimesModal;
