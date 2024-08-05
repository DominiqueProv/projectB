import React, { useState, useEffect } from "react";
import ButtonNoteStyle from "../buttons/ButtonNotesStyle";

const EditableFirstField = ({ tempText, setTempText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    setText(defaultText);
    setTempText(defaultText);
  }, [setTempText]);

  const handleInputChange = (e) => {
    const newText = e.target.value;

    setTempText(newText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (tempText.length === 0) {
        setTempText(defaultText);
        setIsEditing(false);
        return;
      }
      setText(tempText);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleButtonClick = () => {
    if (tempText.length === 0 || tempText.match("Add a description")) {
      setTempText(defaultText);
      setIsEditing(false);
      return;
    }
    if (isEditing) {
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

  return (
    <div className="pr-0">
      {isEditing ? (
        <div className="flex gap-3 w-full">
          <input
            className="p-2 border-none bg-black/05 focus:ring-transparent w-full text-md"
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
            xClass="min-h-[40px] lg:flex-grow self-start flex-shrink-0"
            label="save"
          />
        </div>
      ) : (
        <div className="flex gap-3 group justify-between relative">
          <span
            className={`py-2 text-md ${
              text && !text.startsWith("Add ") ? "text-black" : "text-black/15"
            }`}
            onClick={handleEditClick}
          >
            {text}
          </span>
          <ButtonNoteStyle
            handleClick={handleButtonClick}
            xClass="px-2 absolute right-0 min-h-[40px] group-hover:opacity-100 opacity-0 duration-300 self-start"
            label="edit"
          />
        </div>
      )}
    </div>
  );
};

export default EditableFirstField;
