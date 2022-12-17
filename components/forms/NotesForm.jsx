import { useState, useEffect } from "react";
import { database } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useFiles } from "../../context/FilesContext";
import { useAuth } from "../../context/AuthContext";
import GoogleInput from "./GoogleInput";

const NotesForm = ({ file, setShowModal, index }) => {
  const { user } = useAuth();
  const { filesData, setFilesData, notesInput, setNotesInput, pid } =
    useFiles();
  const [formData, updateFormData] = useState({});
  const fileRefName = file?.metadata?.name?.split(".")[0];

  useEffect(() => {
    setNotesInput(notesInput);
    updateFormData((prev) => ({
      ...prev,
      dateCreated: filesData[index]?.metadata?.customMetadata?.originalDate,
    }));
  }, [notesInput]);

  const saveNote = async () => {
    const docRef = doc(database, `${user.uid}/${pid}/notes/${fileRefName}`);
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

  const handleLocation = (place) => {
    console.log(place);
    updateFormData({
      ...formData,
      location: place,
    });
  };

  return (
    <>
      {notesInput && (
        <form
          className={`flex flex-col space-y-2 ${
            notesInput.length > 0 ? "pt-5" : ""
          }`}
        >
          {notesInput.map((noteType, i) => {
            let input;
            switch (noteType) {
              case "height":
                input = (
                  <input
                    key={i}
                    type="number"
                    name={noteType}
                    placeholder={"baby's height (cm)"}
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
                    placeholder={"baby's weight (kg)"}
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
                  <GoogleInput
                    noteType={noteType}
                    handleLocation={handleLocation}
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
