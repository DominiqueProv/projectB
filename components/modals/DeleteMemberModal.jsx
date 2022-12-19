import { useState, useEffect } from "react";

import ButtonPrimary from "../buttons/ButtonPrimary";
import Modal from "./Portal";
import { useBabies } from "../../context/BabiesContext";
import { useAuth } from "../../context/AuthContext";
import Icon from "../buttons/Icon";

const DeleteMemberModal = ({ baby }) => {
  const [showModal, setShowModal] = useState(false);
  const { deleteBaby } = useBabies();
  const { user } = useAuth();

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
      <ButtonPrimary
        handleClick={() => setShowModal(!showModal)}
        xClass={"p-3 bg-slate-300 hover:bg-slate-400 aspect-square"}
      >
        <Icon icon={"delete"} size={20} />
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
                    handleClick={() => setShowModal(!showModal)}
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
                      setShowModal(false);
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
