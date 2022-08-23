import React from "react";

const ButtonPrimary = ({ label, type, handleClick, children, xClass }) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-indigo-800 text-white rounded-lg py-2 ${xClass}`}
      type={type}
    >
      <div className="flex space-x-2 items-center justify-center">
        {children}
        <span className="hidden sm:block">{label}</span>
      </div>
    </button>
  );
};

export default ButtonPrimary;
