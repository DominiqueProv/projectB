import Icon from "../buttons/Icon";

const ButtonNotesStyle = ({
  label,
  type = "button",
  handleClick,
  children,
  xClass = "",
  notesInput,
}) => {
  const isDisabled = notesInput.includes(label);
  const buttonStyles = isDisabled
    ? "bg-gray-100 text-gray-300"
    : "bg-gray-200 text-indigo-800 hover:bg-indigo-200";

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg py-2 px-3 ${xClass} ${buttonStyles} duration-300 ease-out-expo`}
      type={type}
      data-label={label}
    >
      <div className="flex items-center sm:space-x-1 justify-center">
        {children}
        <Icon
          icon={label}
          xClass={`${isDisabled ? "text-gray-300" : "text-indigo-800"}`}
        />
        <span className="hidden sm:block text-xs font-semibold uppercase">
          {label}
        </span>
      </div>
    </button>
  );
};

export default ButtonNotesStyle;
