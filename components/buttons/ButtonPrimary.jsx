const ButtonPrimary = ({
  label,
  type = "button",
  handleClick,
  children,
  xClass = "",
  isUpload = false,
  isInvalid
}) => {
  return (
    <button
      onClick={handleClick}
      className={`text-white rounded-lg py-2 ${xClass} hover:bg-indigo-600 duration-300 ease-out-expo bg-indigo-800 disabled:bg-gray-300 disabled:cursor-not-allowed`}
      type={type}
      disabled={isUpload || isInvalid}
    >
      <div
        className={`flex items-center ${
          label ? "space-x-2" : ""
        } justify-center`}
      >
        {children}
        {label && <span>{label}</span>}
      </div>
    </button>
  );
};

export default ButtonPrimary;
