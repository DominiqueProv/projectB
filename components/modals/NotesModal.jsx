import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ButtonNotesStyle from "../buttons/ButtonNotesStyle";
import NotesForm from "../forms/NotesForm";

const NotesModal = ({ file }) => {
  const [showModal, setShowModal] = useState(false);
  const [notesInput, setNotesInput] = useState([]);
  const notesStyle = ["height", "weigth", "description", "location", "mood"];

  const handleClick = (e) => {
    const dataLabel = e.currentTarget.dataset.label;
    if (notesInput.includes(dataLabel)) {
      const filteredInput = notesInput.filter((el) => el !== dataLabel);
      setNotesInput(filteredInput);
    } else {
      setNotesInput((prev) => [...prev, dataLabel]);
    }
  };

  return (
    <>
      <ButtonSecondary
        className="font-bold text-xs"
        handleClick={() => setShowModal(!showModal)}
        label={"Add Notes"}
      />

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
              <button
                onClick={() => setShowModal(!showModal)}
                className="bg-blue-200 self-end z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                type="button"
              >
                <IoMdClose
                  size={25}
                  className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
                />
              </button>
              <h3 className="text-3xl font-semibold">Add notes</h3>
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
                file={file}
                setShowModal={setShowModal}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NotesModal;
