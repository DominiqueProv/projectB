const ButtonSecondary = ({
  label,
  type = "button",
  handleClick,
  children,
  xClass = "",
}) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-blue-100 font-medium text-xs text-blue-500 self-start flex items-center ${xClass}`}
      type={type}
    >
      <div className={`flex ${label ? "space-x-2" : ""} items-center`}>
        {children}
        {label && <span>{label}</span>}
      </div>
    </button>
  );
};

export default ButtonSecondary;
