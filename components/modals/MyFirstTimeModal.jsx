import { useState, useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { CgSmileMouthOpen } from "react-icons/cg";
import Icon from "../buttons/Icon";
import AddDateModal from "./AddDateModal";
import { useMyFirst } from "../../context/MyFirstContext";
import { formatDateFirst } from "../../utils/date";

const MyFirstTime = () => {
  const [showModal, setShowModal] = useState(false);
  const { date, formDataFromDb, getInfo, handleDelete } = useMyFirst();

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
          className="bg-pink-400 z-30
  p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
        >
          <CgSmileMouthOpen size={35} className="text-white" />
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
              className={`flex justify-end p-2 duration-500 ease-out-expo absolute z-20 right-0 bottom-0 w-full ${
                showModal ? "translate-y-0" : "translate-y-[100%]"
              }`}
            >
              <div className="flex w-full sm:w-420 border-0 rounded-lg p-3 shadow-lg relative gap-3 flex-col bg-white outline-none focus:outline-none">
                <div className="flex justify-between">
                  <ModalTitle title="My First times" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <div className="flex gap-3 items-center bg-slate-100 p-1 pl-3 justify-between">
                  {!formDataFromDb.myFirstTeeth ? (
                    <>
                      <span className="text-indigo-800 font-semibold">
                        My first teeth
                      </span>
                      <AddDateModal date={date} id={"myFirstTeeth"} />
                    </>
                  ) : (
                    <>
                      <span className="flex-grow flex flex-col rounded-md">
                        <span className="text-indigo-800 font-semibold">
                          My first teeth
                        </span>
                        {formatDateFirst(formDataFromDb.myFirstTeeth)}
                      </span>
                      <button
                        className="bg-slate-50 cursor-pointer text-white rounded-lg py-2 flex items-center justify-center aspect-square h-full hover:bg-slate-300 duration-300 ease-out-expo"
                        onClick={handleDelete}
                        name="myFirstTeeth"
                      >
                        <Icon
                          icon={"minus"}
                          size={25}
                          xClass="text-slate-500"
                        />
                      </button>
                    </>
                  )}
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
