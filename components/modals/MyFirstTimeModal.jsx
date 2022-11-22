import { useState } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { CgSmileMouthOpen } from "react-icons/cg";
import MyFirstField from "../MyFirstField";
import { myFirstfields } from "../../data/my_first_fields";
import { CgSpinner } from "react-icons/cg";
import { useMyFirst } from "../../context/MyFirstContext";

const MyFirstTime = () => {
  const [showModal, setShowModal] = useState(false);
  const { isDeleting } = useMyFirst();

  return (
    <>
      {!showModal && (
        <button
          onClick={() => {
            setShowModal(true);
            if (typeof window != "undefined" && window.document) {
              document.body.style.overflow = "hidden";
            }
          }}
          className="bg-white z-30
  p-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
        >
          <CgSmileMouthOpen size={35} className="text-pink-400" />
        </button>
      )}

      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => {
                setShowModal(false);
                document.body.style.overflow = "unset";
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-20 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <aside
              className={`flex justify-end p-2 duration-500 ease-out-expo fixed z-20 right-0 bottom-0 w-full`}
            >
              <div className="flex w-full sm:w-420 border-0 rounded-lg p-3 shadow-lg relative gap-3 flex-col bg-white outline-none focus:outline-none">
                <div className="flex justify-between">
                  <ModalTitle title="First times" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <div
                  className={`flex-grow min-h-[504px] flex justify-center items-center ${
                    isDeleting ? "block" : "hidden"
                  }`}
                >
                  <CgSpinner
                    className="animate-spin"
                    color={"dodgerblue"}
                    size={40}
                  />
                </div>
                <div
                  className={` flex flex-col gap-2 ${
                    isDeleting ? "hidden" : "block"
                  }`}
                >
                  {myFirstfields.map((item) => (
                    <MyFirstField key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </aside>
          </>
        )}
      </Modal>
    </>
  );
};

export default MyFirstTime;
