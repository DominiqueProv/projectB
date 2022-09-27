import { useState, useEffect } from "react";
import { v4 } from "uuid";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ButtonNotesStyle from "../buttons/ButtonNotesStyle";
import NotesForm from "../forms/NotesForm";
import CloseButton from "../buttons/CloseButton";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useFiles } from "../../context/FilesContext";
import Icon from "../buttons/Icon";
import Modal from "./Portal";

const NotesModal = ({ isFileModal, file, index }) => {
  const [showModal, setShowModal] = useState(false);
  const { notesInput, setNotesInput } = useFiles();

  const notesStyle = [
    "title",
    "description",
    "location",
    "mood",
    "height",
    "weight",
  ];

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
    if (notesInput.includes(dataLabel)) {
      const filteredInput = notesInput.filter((el) => el !== dataLabel);
      setNotesInput(filteredInput);
    } else {
      setNotesInput((prev) => [...prev, dataLabel]);
    }
  };

  useEffect(() => {
    orderInput(notesInput);
  }, []);

  return (
    <>
      {!file?.notes && !isFileModal && (
        <ButtonSecondary
          className="font-bold text-xs"
          xClass={
            "px-2 rounded-md hover:bg-indigo-800 hover:text-white duration-300 ease-out-expo flex-shrink-0"
          }
          handleClick={() => setShowModal(!showModal)}
          label={"Add Notes"}
        />
      )}
      {isFileModal && (
        <ButtonPrimary
          handleClick={() => setShowModal(!showModal)}
          label={file?.notes ? "Edit Notes" : "Add Notes"}
          xClass={"px-3 flex-grow"}
        >
          <div className="lg:hidden">
            <Icon icon={"edit"} size={25} xClass={"hidden lg:block"} />
          </div>
        </ButtonPrimary>
      )}
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => setShowModal(false)}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full p-4 lg:flex lg:justify-center">
              <div className="flex w-full lg:max-w-[520px] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">
                    {file?.notes ? "Edit Notes" : "Add Notes"}
                  </h3>
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <ul className="flex justify-between lg:justify-start gap-2 pt-3 lg:flex-wrap">
                  {notesStyle.map((type) => {
                    return (
                      <ButtonNotesStyle
                        label={type}
                        key={`${v4()}`}
                        handleClick={handleClick}
                        notesInput={notesInput}
                      />
                    );
                  })}
                </ul>
                <NotesForm
                  notesInput={notesInput}
                  setShowModal={setShowModal}
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
