const ButtonPrimary = ({ label, type, handleClick, children, xClass }) => {
  return (
    <button
      onClick={handleClick}
      className={` text-white rounded-lg py-2 ${xClass} hover:bg-indigo-600 duration-300 ease-out-expo bg-indigo-800`}
      type={type}
    >
      <div className="flex items-center space-x-2 justify-center">
        {children}
        <span>{label}</span>
      </div>
    </button>
  );
};

export default ButtonPrimary;
