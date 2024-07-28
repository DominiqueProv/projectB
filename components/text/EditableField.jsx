import React, { useState } from "react";
import { useFiles } from "../../context/FilesContext";
import ButtonNoteStyle from "../buttons/ButtonNotesStyle";

const EditableField = (props) => {
  const { file, index } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(file?.notes?.title || "Add a title");
  const [tempText, setTempText] = useState(text);
  const { saveNote, formData, updateFormData } = useFiles();

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setTempText(newText);
    updateFormData({
      ...formData,
      title: newText,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveNote(file, index);
      setText(tempText);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleButtonClick = () => {
    if (isEditing) {
      saveNote(file, index);
      setText(tempText);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleFocus = () => {
    if (tempText === "Add a title") {
      setTempText("");
    }
  };

  const handleBlur = () => {
    if (tempText === "") {
      setTempText(text || "Add a title");
      setIsEditing(false);
    }
  };

  return (
    <div className="pr-3 lg:pr-16">
      {isEditing ? (
        <div className="flex gap-3 w-full">
          <input
            className="p-2 border-none bg-black/05 focus:ring-transparent w-full text-indigo-800 text-2xl lg:text-3xl font-semibold"
            type="text"
            value={tempText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus
          />
          <ButtonNoteStyle
            handleClick={handleButtonClick}
            xClass="px-5 flex-grow"
            label="save"
          />
        </div>
      ) : (
        <div className="flex gap-3 group">
          <span
            className={`py-2 ${
              !text.includes("Add") ? "text-black" : "text-black/15"
            } text-2xl lg:text-3xl font-semibold`}
            onClick={handleEditClick}
          >
            {text || "Add a title"}
          </span>
          <ButtonNoteStyle
            handleClick={handleButtonClick}
            xClass="px-5 group-hover:opacity-100 opacity-0 duration-300"
            label="edit"
          />
        </div>
      )}
    </div>
  );
};

export default EditableField;
