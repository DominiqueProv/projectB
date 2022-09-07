const ButtonSecondary = ({ label, type, handleClick, children, xClass }) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-blue-100 font-bold text-sm text-blue-500 self-start flex items-center ${xClass}`}
      type={type}
    >
      <div className={`flex ${label ? "space-x-2" : "space-x-0"} items-center`}>
        {children}
        <span className="hidden sm:block">{label}</span>
      </div>
    </button>
  );
};

export default ButtonSecondary;
