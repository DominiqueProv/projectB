import { useState } from "react";

import ButtonPrimary from "../buttons/ButtonPrimary";
import Icon from "../buttons/Icon";
import Modal from "./Modal";

const DeleteModal = ({ file, deleteFile, setShowFileModal }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonPrimary
        handleClick={() => setShowModal(!showModal)}
        label={"Delete Memory"}
        xClass={"px-3 flex-grow"}
      ></ButtonPrimary>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => setShowModal(false)}
              className={`inset-0 absolute bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="flex justify-center items-center absolute z-40 inset-0">
              <div className="flex w-full sm:max-w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <h3 className="text-xl font-semibold">
                  Are you sure you want to delete this file ?
                </h3>
                <div className="flex space-x-2 pt-3">
                  <ButtonPrimary
                    xClass={"px-4 bg-red-500 flex-grow"}
                    type={"button"}
                    label={"Delete"}
                    handleClick={() => {
                      deleteFile(file);
                      setShowModal(false);
                      setShowFileModal(false);
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

export default DeleteModal;