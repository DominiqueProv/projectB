import React from "react";

const ButtonPrimary = ({ label, type, handleClick, children }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-indigo-800 text-white rounded-lg px-2 sm:px-4 py-2"
      type={type}
    >
      <div className="flex space-x-2 items-center">
        {children}
        <span className="hidden sm:block">{label}</span>
      </div>
    </button>
  );
};

export default ButtonPrimary;
