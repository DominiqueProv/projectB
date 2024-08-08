import React, { useState, useEffect } from "react";
import { useFiles } from "../../context/FilesContext";
import ButtonNoteStyle from "../buttons/ButtonNotesStyle";
import GoogleInput from "../forms/GoogleInput";
import EmojiInput from "../forms/EmojiInput";

const EditableField = ({
  file,
  fileIndex,
  noteType,
  noteValue,
  isTitle = false,
}) => {
  const defaultText = noteValue ? noteValue : `Add ${noteType}`;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);
  const { saveNote, formData, updateFormData } = useFiles();

  useEffect(() => {
    setText(defaultText);
    setTempText(defaultText);
  }, [defaultText]);

  const handleInputChange = (e) => {
    const newText = e.target.value;

    // If the noteType is 'height' or 'weight', only allow digits and decimals
    if (noteType === "height" || noteType === "weight") {
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(newText)) {
        return;
      }
    }

    setTempText(newText);
    updateFormData({
      ...formData,
      [noteType]: newText,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveNote(file, fileIndex);
      setText(tempText);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleButtonClick = () => {
    if (isEditing) {
      saveNote(file, fileIndex);
      setText(tempText);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleFocus = () => {
    if (tempText.startsWith("Add ")) {
      setTempText("");
    }
  };

  const handleBlur = () => {
    if (tempText === "") {
      setTempText(defaultText);
      setIsEditing(false);
    }
  };

  const handleLocation = (location) => {
    setTempText(location);
    updateFormData({
      ...formData,
      [noteType]: location,
    });
  };

  const handleSave = () => {
    saveNote(file, fileIndex);
    setText(tempText);
    setIsEditing(false);
  };

  return (
    <div className={`${isTitle ? "pr-3 lg:pr-16" : "pr-0"}`}>
      {isEditing ? (
        <div className="flex gap-3 w-full">
          {noteType === "location" ? (
            <GoogleInput noteType={noteType} handleLocation={handleLocation} />
          ) : noteType === "mood" ? (
            <EmojiInput
              updateFormData={updateFormData}
              formData={formData}
              handleSave={handleSave}
              file={file}
              fileIndex={fileIndex}
            />
          ) : (
            <input
              className={`p-2 border-none bg-black/05 focus:ring-transparent w-full ${
                isTitle
                  ? "text-indigo-800 text-xl lg:text-3xl font-semibold"
                  : "text-md"
              }`}
              type="text"
              value={tempText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoFocus
              inputMode={
                noteType === "height" || noteType === "weight"
                  ? "decimal"
                  : "text"
              }
              pattern={
                noteType === "height" || noteType === "weight"
                  ? "\\d*\\.?\\d*"
                  : undefined
              }
            />
          )}
          {noteType !== "mood" && (
            <ButtonNoteStyle
              handleClick={handleButtonClick}
              xClass={`${
                isTitle ? "px-5 min-h-[55px]" : "min-h-[40px]"
              } lg:flex-grow self-start flex-shrink-0`}
              label="save"
            />
          )}
        </div>
      ) : (
        <div
          className={`flex gap-3 group ${
            !isTitle ? "justify-between relative" : ""
          }`}
        >
          <span
            className={`py-2 ${
              text && !text.startsWith("Add ") ? "text-black" : "text-black/15"
            } ${isTitle ? "text-xl lg:text-3xl font-semibold" : "text-md"}`}
            onClick={handleEditClick}
          >
            {text}
          </span>
          <ButtonNoteStyle
            handleClick={handleButtonClick}
            xClass={`${
              isTitle
                ? "px-5 min-h-[55px]"
                : "px-2 absolute right-0 min-h-[40px]"
            } group-hover:opacity-100 opacity-0 duration-300 self-start`}
            label="edit"
          />
        </div>
      )}
    </div>
  );
};

export default EditableField;
