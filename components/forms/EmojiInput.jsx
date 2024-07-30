import React, { useState, useEffect } from "react";
import { uuidv4 } from "@firebase/util";
import ButtonNoteStyle from "../buttons/ButtonNotesStyle";

const EmojiInput = ({
  formData,
  updateFormData,
  handleSave,
  file,
  fileIndex,
}) => {
  const [data, setData] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(formData.mood || "");
  const [emojies, setEmojies] = useState({
    query: "",
    list: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://emoji-api.com/categories/smileys-emotion?access_key=df0980e0f964788d62dc21d10dc59533cb95a264"
      );
      const data = await response.json();
      const displayData = data.slice(0, 150);
      setEmojies({ list: displayData });
      setData(displayData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const results = data.filter((el) => {
      if (e.target.value === "") return data;
      return el?.slug?.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setEmojies({
      query: e.target.value,
      list: results,
    });
  };

  const handleSelect = (e) => {
    setIsSelected(true);
    setSelectedEmoji(e.target.innerText);
    updateFormData({
      ...formData,
      mood: e.target.innerText,
    });
  };

  const handleSaveClick = () => {
    handleSave(file, fileIndex);
    setIsSelected(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div key={1010} className="w-full">
      {isSelected ? (
        <div className="flex justify-between items-center _fake-input-container">
          <span className="text-3xl">{selectedEmoji}</span>
          <ButtonNoteStyle
            handleClick={handleSaveClick}
            xClass="px-3"
            label="save"
          />
        </div>
      ) : (
        <>
          <input
            className="w-full mb-4"
            placeholder="Search emojis"
            type="text"
            onKeyUp={handleSearch}
          />
          <ul className="rounded-lg py-4 grid grid-cols-9 gap-y-3 overflow-y-auto max-h-[300px]">
            {emojies.list.map((emoji) => (
              <li
                className="text-3xl text-center cursor-pointer"
                key={uuidv4()}
                onClick={handleSelect}
                data-name={emoji.slug}
              >
                {emoji.character}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EmojiInput;
