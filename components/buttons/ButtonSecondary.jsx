const ButtonSecondary = ({ label, type, handleClick, children }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-100 font-bold text-sm py-1 px-1 sm:px-2 text-blue-500 rounded-md self-start flex items-center gap-1"
      type={type}
    >
      <div className="flex space-x-2 items-center">
        {children}
        <span className="hidden sm:block">{label}</span>
      </div>
    </button>
  );
};

export default ButtonSecondary;
