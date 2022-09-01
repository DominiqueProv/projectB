import React from "react";

const ButtonPrimary = ({
  label,
  type,
  handleClick,
  children,
  xClass,
  isDisabled,
}) => {
  const disabledClass = isDisabled
    ? "bg-gray-500 cursor-not-allowed"
    : "bg-indigo-800";
  console.log(isDisabled);
  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={` text-white rounded-lg py-2 ${xClass} ${disabledClass}`}
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
