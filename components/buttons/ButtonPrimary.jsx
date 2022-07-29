import React from "react";

const ButtonPrimary = ({ label, type, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-indigo-800 text-white rounded-lg px-4 py-2"
      type={type}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
