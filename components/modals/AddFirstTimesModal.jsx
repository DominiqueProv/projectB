import { IoMdClose } from "react-icons/io";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import ModalTitle from "../text/ModalTitle";
import MyFirstField from "../MyFirstsTimes/MyFirstField";
import useModal from "../../hooks/useModal";

const AddFirstTimesModal = ({ myFirstfields }) => {
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  return (
    <>
      <button
        onClick={openModal}
        className={"flex items-center gap-3 group"}
        type="button"
      >
        <span className="font-medium text-violet-500">Suggestions</span>
        <div className="border-2 bg-violet-50 group h-9 sm:h-10 aspect-square rounded-lg border-violet-500 flex justify-center items-center duration-300 ease-out-expo relative">
          <Icon
            icon={"add"}
            xClass={
              "text-violet-500 scale-75 group-hover:scale-100 duration-300 "
            }
            size={50}
          />
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
              className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90vw] lg:max-w-[80vw]"
              ref={modalRef}
            >
              <div className="flex w-full rounded-lg relative flex-col bg-white max-h-[80vh]">
                <div className="flex justify-between items-center p-3 border-b border-gray-200">
                  <ModalTitle title="Add a first time" />
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
                <div className="pt-4 max-h-[calc(100vh-30px)] overflow-y-auto">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-3">
                    {myFirstfields.map((item, index) => (
                      <MyFirstField
                        key={item.id}
                        item={item}
                        index={index}
                        setShowAddMyFirstModal={closeModal}
                      />
                    ))}
                  </div>
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
