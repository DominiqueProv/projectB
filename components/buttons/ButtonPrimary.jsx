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
      className={` text-white rounded-lg py-2 ${xClass} ${disabledClass} hover:bg-blue-500 duration-300 ease-out-expo`}
      type={type}
    >
      <div className="flex items-center sm:space-x-2 justify-center">
        {children}
        <span className="hidden sm:block">{label}</span>
      </div>
    </button>
  );
};

export default ButtonPrimary;
