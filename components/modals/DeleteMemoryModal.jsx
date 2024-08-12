import ButtonPrimary from "../buttons/ButtonPrimary";
import Modal from "./Portal";
import { useFiles } from "../../context/FilesContext";
import Icon from "../buttons/Icon";
import useModal from "../../hooks/useModal";

const DeleteMemoryModal = ({ file, setShowFileModal }) => {
  const { deleteFile } = useFiles();
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  const handleDelete = () => {
    deleteFile(file);
    closeModal();
    setShowFileModal(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-black/50 font-medium underline underline-offset-4 text-xs"
        type="button"
      >
        Delete
        <div className="lg:hidden">
          <Icon icon="delete" size={30} xClass="hidden lg:block" />
        </div>
      </button>
      <Modal>
        {isOpen && (
          <>
            <div
              onClick={closeModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            ></div>
            <div
              className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              ref={modalRef}
            >
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <h3 className="text-xl font-semibold">
                  Are you sure you want to delete this file?
                </h3>
                <div className="flex space-x-2 pt-3">
                  <ButtonPrimary
                    handleClick={closeModal}
                    xClass="px-4 flex-grow"
                    type="button"
                    label="Cancel"
                  />
                  <ButtonPrimary
                    handleClick={handleDelete}
                    xClass="px-4 bg-red-500 flex-grow"
                    type="button"
                    label="Delete"
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

export default DeleteMemoryModal;
