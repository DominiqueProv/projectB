import { IoMdClose } from "react-icons/io";

const CloseButton = ({ setShowModal }) => {
  const handleClose = () => {
    document.body.style.overflow = "unset";
    setShowModal(false);
  };

  return (
    <button
      onClick={handleClose}
      className="bg-blue-200 flex-shrink-0 self-start z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
      type="button"
    >
      <IoMdClose
        size={25}
        className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
      />
    </button>
  );
};

export default CloseButton;
