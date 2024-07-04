import React, { useState, useEffect } from "react";
import { uuidv4 } from "@firebase/util";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Icon from "../buttons/Icon";

const EmojiInput = ({ formData, updateFormData }) => {
  const [data, setData] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
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
      console.log(err);
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

  const handleReset = () => {
    setIsSelected(false);
    setSelectedEmoji("");
    updateFormData({
      ...formData,
      mood: "",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div key={1010}>
      {isSelected ? (
        <div className="flex justify-between _fake-input-container">
          <span className="text-3xl">{selectedEmoji}</span>
          <ButtonPrimary
            handleClick={handleReset}
            xClass={"px-2 bg-indigo-300 aspect-square"}
          >
            <Icon icon={"delete"} size={20} />
          </ButtonPrimary>
        </div>
      ) : (
        <>
          <input
            className="w-full mb-4"
            placeholder="Search emojies"
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
