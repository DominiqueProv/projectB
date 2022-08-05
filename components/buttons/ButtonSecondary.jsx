import { FaTimes } from "react-icons/fa";

const ButtonPrimary = ({ label, type, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-100 font-bold text-sm py-1 px-2 text-blue-500 rounded-md self-start flex items-center gap-1"
      type={type}
    >
      <FaTimes size={15} className="text-blue-500" />
      {label}
    </button>
  );
};

export default ButtonPrimary;
