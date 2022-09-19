import { useState, useEffect } from "react";
import { database } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useFiles } from "../../context/FilesContext";

const NotesForm = ({ file, setShowModal, index }) => {
  const { filesData, setFilesData, notesInput, setNotesInput } = useFiles();
  const [formData, updateFormData] = useState({});
  const fileRefName = file?.metadata?.name?.split(".")[0];

  useEffect(() => {
    setNotesInput(notesInput);
  }, [notesInput]);

  const saveNote = async () => {
    const docRef = doc(database, `notes/${fileRefName}`);
    await setDoc(docRef, formData, {
      merge: true,
    });
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newfilesData = [...filesData];
      newfilesData[index] = {
        ...newfilesData[index],
        notes: docSnap.data(),
      };
      setFilesData(newfilesData);
      setNotesInput([]);
    } else {
      console.log("No such document!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNote();
    setShowModal(false);
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
              {!file.notes ? "Add Informations" : "Edit Informations"}
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default NotesForm;
