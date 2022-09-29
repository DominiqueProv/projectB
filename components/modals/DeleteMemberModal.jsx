import { useState } from "react";

import ButtonPrimary from "../buttons/ButtonPrimary";
import Modal from "./Portal";
import { useBabies } from "../../context/BabiesContext";
import { useAuth } from "../../context/AuthContext";
import Icon from "../buttons/Icon";

const DeleteMemberModal = ({ baby }) => {
  const [showModal, setShowModal] = useState(false);
  const { deleteBaby, setReload, reload } = useBabies();
  const { user } = useAuth();
  return (
    <>
      <ButtonPrimary
        handleClick={() => setShowModal(!showModal)}
        xClass={"px-3 bg-slate-300 hover:bg-slate-400"}
      >
        <Icon icon={"delete"} size={20} xClass={"hidden lg:block"} />
      </ButtonPrimary>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => setShowModal(false)}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <h3 className="text-xl font-semibold">
                  Are you sure you want to delete this member ?
                </h3>
                <div className="flex space-x-2 pt-3">
                  <ButtonPrimary
                    xClass={"px-4 bg-red-500 flex-grow"}
                    type={"button"}
                    label={"Delete"}
                    handleClick={() => {
                      deleteBaby(user.uid, baby);
                      setShowModal(false);
                    }}
                  />
                  <ButtonPrimary
                    handleClick={() => setShowModal(!showModal)}
                    xClass={"px-4 flex-grow"}
                    type={"button"}
                    label={"Cancel"}
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
