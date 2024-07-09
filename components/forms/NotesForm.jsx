import { useEffect } from "react";
import { useFiles } from "../../context/FilesContext";
import GoogleInput from "./GoogleInput";
import EmojiInput from "./EmojiInput";

const NotesForm = ({ file, setShowModal, index }) => {
  const { filesData, notesInput, setNotesInput, saveNote, formData, updateFormData, setTempFormData } =
    useFiles();
  useEffect(() => {
    setNotesInput(notesInput);
    updateFormData((prev) => ({
      ...prev,
      dateCreated: filesData[index]?.metadata?.customMetadata?.originalDate,
    }));
  }, [notesInput]);


  const handleSubmit = (e) => {
    e.preventDefault();
    saveNote(file);
    setShowModal(false);
    setTempFormData(formData);
    updateFormData({});
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocation = (place) => {
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
                  <EmojiInput
                    updateFormData={updateFormData}
                    formData={formData}
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
