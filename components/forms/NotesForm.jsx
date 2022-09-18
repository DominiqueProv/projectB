import { useState, useEffect } from "react";
import { database } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const NotesForm = ({ notesInput, file, notes, setShowModal }) => {
  const [formData, updateFormData] = useState({});
  const [upNotesInput, setNotesInput] = useState([]);
  const fileRefName = file.metadata.name.split(".")[0];

  useEffect(() => {
    setNotesInput(notesInput);
  }, [notesInput]);

  const saveNote = async () => {
    await setDoc(doc(database, `notes/${fileRefName}`), formData, {
      merge: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNote();
    setShowModal(false);
    setNotesInput([]);
    updateFormData({});
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {upNotesInput && (
        <form className="flex flex-col space-y-2 pt-5">
          {upNotesInput.map((noteType, i) => {
            let input;
            switch (noteType) {
              case "height":
                input = (
                  <input
                    key={i}
                    type="number"
                    name={noteType}
                    placeholder={"height in metric"}
                    onChange={handleChange}
                  />
                );
                break;
              case "title":
                input = (
                  <input
                    key={i}
                    type="text"
                    name={noteType}
                    placeholder={"your title"}
                    onChange={handleChange}
                  />
                );
                break;
              case "weight":
                input = (
                  <input
                    key={i}
                    type="number"
                    name={noteType}
                    placeholder={"weight in kg"}
                    onChange={handleChange}
                  />
                );
                break;
              case "description":
                input = (
                  <textarea
                    key={i}
                    className="w-full"
                    type="text"
                    name={noteType}
                    rows="4"
                    placeholder={"Add some details"}
                    onChange={handleChange}
                  />
                );
                break;
              case "location":
                input = (
                  <input
                    key={i}
                    type="text"
                    name={noteType}
                    placeholder={"Where are we"}
                    onChange={handleChange}
                  />
                );
                break;
              case "mood":
                input = (
                  <input
                    key={i}
                    type="text"
                    name={noteType}
                    placeholder={"How are we feeling"}
                    onChange={handleChange}
                  />
                );
                break;
              default:
                input = (
                  <input
                    key={i}
                    type="text"
                    name="default"
                    onChange={handleChange}
                  />
                );
                break;
            }
            return input;
          })}
          {notesInput.length > 0 && (
            <button
              className="bg-indigo-800 cursor-pointer text-white rounded-lg py-2 hover:bg-blue-500 duration-300 ease-out-expo"
              onClick={handleSubmit}
            >
              {Object.keys(notes).length === 0
                ? "Add Informations"
                : "Edit Informations"}
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default NotesForm;
