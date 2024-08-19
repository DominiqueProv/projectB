import ButtonPrimary from "../buttons/ButtonPrimary";
import Modal from "./Portal";
import { useBabies } from "../../context/BabiesContext";
import { useAuth } from "../../context/AuthContext";
import Icon from "../buttons/Icon";
import useModal from "../../hooks/useModal";

const DeleteMemberModal = ({ baby }) => {
  const { deleteBaby } = useBabies();
  const { user } = useAuth();
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  return (
    <>
      <ButtonPrimary
        handleClick={openModal}
        xClass={
          "bg-transparent pt-0 sm:p-2 sm:bg-slate-200 sm:!rounded-full sm:hover:bg-slate-300 sm:aspect-square"
        }
      >
        <span className="sm:hidden text-black/30 font-medium underline underline-offset-4 text-xs">
          Delete
        </span>
        <Icon
          icon={"minus"}
          xClass={"hidden sm:block text-slate-400"}
          size={20}
        />
      </ButtonPrimary>
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
                  Are you sure you want to delete this member?
                </h3>
                <div className="flex space-x-2 pt-3">
                  <ButtonPrimary
                    handleClick={closeModal}
                    xClass={"px-4 flex-grow"}
                    type={"button"}
                    label={"Cancel"}
                  />
                  <ButtonPrimary
                    xClass={"px-4 bg-red-500 flex-grow"}
                    type={"button"}
                    label={"Delete"}
                    handleClick={() => {
                      deleteBaby(user.uid, baby);
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

export default DeleteMemberModal;
