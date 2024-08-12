import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import Calendar from "react-calendar";
import ModalTitle from "../text/ModalTitle";
import { useMyFirst } from "../../context/MyFirstContext";
import { useBabies } from "../../context/BabiesContext";
import useModal from "../../hooks/useModal";

const AddCustomDateModal = ({ date, onChange, id, setChosenDate }) => {
  const { setId } = useMyFirst();
  const { babyData } = useBabies();
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  const minDate = new Date(babyData.date.seconds * 1000);

  return (
    <>
      <button
        onClick={() => {
          openModal();
          setId(id);
        }}
        className={""}
        type="button"
      >
        <div className="pr-3 gap-1 flex justify-center items-center duration-300 rounded-lg border-2 border-indigo-800 ease-out-expo relative group bg-indigo-50">
          <Icon
            icon={"add"}
            xClass={
              "text-indigo-800 scale-75 group-hover:scale-90 duration-300 "
            }
            size={40}
          />
          <span className="flex-shrink-0 text-indigo-800">Add a date</span>
        </div>
      </button>
      <Modal>
        {isOpen && (
          <>
            <div
              onClick={closeModal}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                isOpen ? "block" : "hidden"
              }`}
            ></div>
            <div
              className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              ref={modalRef}
            >
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <ModalTitle title="Add a date" />
                  <button
                    onClick={closeModal}
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
                      setChosenDate(value);
                      onChange(value);
                      closeModal();
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

export default AddCustomDateModal;
