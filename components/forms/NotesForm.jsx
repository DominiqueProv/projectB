import { useState } from "react";
import { database } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const initialFormData = Object.freeze({
  height: 0,
  weigth: 0,
  description: "",
  location: "",
  mood: "",
});

const NotesForm = ({ notesInput, file, setShowModal }) => {
  const [formData, updateFormData] = useState(initialFormData);
  const fileRefName = file.metadata.name.split(".")[0];

  const saveNote = async () => {
    await setDoc(doc(database, `notes/${fileRefName}`), formData, {
      merge: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNote();
    setShowModal(false);
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {notesInput && (
        <form className="flex flex-col space-y-2 pt-5">
          {notesInput.map((noteType, i) => {
            let input;
            switch (noteType) {
              case "height":
                input = (
                  <input
                    key={i}
                    type="number"
                    name={noteType}
                    placeholder={"metric"}
                    onChange={handleChange}
                  />
                );
                break;
              case "weigth":
                input = (
                  <input
                    key={i}
                    type="number"
                    name={noteType}
                    placeholder={"kg"}
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
              Add Informations
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default NotesForm;
