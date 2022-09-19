import { useState, useEffect } from "react";
import { v4 } from "uuid";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ButtonNotesStyle from "../buttons/ButtonNotesStyle";
import NotesForm from "../forms/NotesForm";
import CloseButton from "../buttons/CloseButton";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useFiles } from "../../context/FilesContext";

const NotesModal = ({ isFileModal, file, index }) => {
  const [showModal, setShowModal] = useState(false);
  // const [notesInput, setNotesInput] = useState([]);
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
        />
      )}

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
              <CloseButton showModal={showModal} setShowModal={setShowModal} />
              <h3 className="text-3xl font-semibold">
                {file?.notes ? "Edit Notes" : "Add Notes"}
              </h3>
              <ul className="flex flex-wrap gap-2 pt-3">
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
    </>
  );
};

export default NotesModal;
