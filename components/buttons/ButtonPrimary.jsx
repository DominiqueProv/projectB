const ButtonPrimary = ({ label, type, handleClick, children, xClass }) => {
  return (
    <button
      onClick={handleClick}
      className={` text-white rounded-lg py-2 ${xClass} hover:bg-blue-500 duration-300 ease-out-expo bg-indigo-800`}
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
