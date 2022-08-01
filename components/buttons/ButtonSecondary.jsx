import React from "react";

const ButtonPrimary = ({ label, type, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-100 py-1 px-3 text-blue-500 rounded-md self-start"
      type={type}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
