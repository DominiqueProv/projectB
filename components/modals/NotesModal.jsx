import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ButtonNotesStyle from "../buttons/ButtonNotesStyle";
import NotesForm from "../forms/NotesForm";
import CloseButton from "../buttons/CloseButton";
import { useFiles } from "../../context/FilesContext";
import Modal from "./Portal";
import ModalTitle from "../text/ModalTitle";
import useModal from "../../hooks/useModal";

const NotesModal = ({ isFileModal, file, index }) => {
  const { notesInput, setNotesInput } = useFiles();
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  const notesStyle = ["description", "location", "mood", "height", "weight"];

  const orderInput = (notesInput) => {
    const customLookup = notesStyle.reduce((r, a, i) => {
      r[a] = `${i}`;
      return r;
    }, {});
    const customSortFn = (a, b) => {
      return (customLookup[a] || a).localeCompare(customLookup[b] || b);
    };
    notesInput.sort(customSortFn);
  };

  const handleClick = (e) => {
    const dataLabel = e.currentTarget.dataset.label;
    setNotesInput((prev) =>
      prev.includes(dataLabel)
        ? prev.filter((el) => el !== dataLabel)
        : [...prev, dataLabel]
    );
  };

  useEffect(() => {
    orderInput(notesInput);
  }, [notesInput]);

  return (
    <>
      {!file?.notes && !isFileModal && (
        <ButtonSecondary
          className="text-xs z-50"
          xClass="px-2 rounded-md hover:bg-indigo-800 hover:text-white duration-300 ease-out-expo flex-shrink-0"
          handleClick={openModal}
          label="Add Notes"
        />
      )}
      <Modal>
        {isOpen && (
          <>
            <div
              onClick={closeModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            ></div>
            <div
              className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full p-4 lg:flex lg:justify-center"
              ref={modalRef}
            >
              <div className="flex w-full lg:max-w-[520px] rounded-lg p-3 relative flex-col bg-white overflow-scroll max-h-[calc(100vh-30px)]">
                <div className="flex justify-between items-center">
                  <ModalTitle
                    title={file?.notes ? "Edit Notes" : "Add Notes"}
                  />
                  <CloseButton showModal={isOpen} setShowModal={closeModal} />
                </div>
                <ul className="flex gap-2 pt-3 lg:flex-wrap">
                  {notesStyle.map((type) => (
                    <ButtonNotesStyle
                      label={type}
                      key={uuidv4()}
                      handleClick={handleClick}
                      notesInput={notesInput}
                    />
                  ))}
                </ul>
                <NotesForm
                  notesInput={notesInput}
                  setShowModal={closeModal}
                  file={file}
                  index={index}
                />
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default NotesModal;
