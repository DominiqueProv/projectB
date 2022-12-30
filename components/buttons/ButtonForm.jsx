const ButtonForm = ({
  label,
  type,
  handleClick,
  children,
  xClass,
  isValid,
}) => {
  const disabled = `${
    isValid
      ? "text-white hover:bg-indigo-600 duration-300 ease-out-expo bg-indigo-800"
      : "bg-slate-100 text-gray-500 cursor-not-allowed"
  }`;
  return (
    <button
      onClick={handleClick}
      className={`${disabled} rounded-lg py-2 ${xClass} `}
      type={type}
      disabled={!isValid}
    >
      <div
        className={`flex items-center ${
          label ? "space-x-2" : ""
        } justify-center`}
      >
        {children}
        <span>{label}</span>
      </div>
    </button>
  );
};

export default ButtonForm;
