import { TbMenu2 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const BurgerMenu = ({ setShowModal, showModal }) => {
  const toggleModal = () => {
    setShowModal(!showModal);
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = showModal ? "unset" : "hidden";
    }
  };

  return (
    <button
      onClick={toggleModal}
      className="bg-blue-200 z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none w-12 h-12 flex justify-center items-center"
      type="button"
    >
      {showModal ? (
        <IoMdClose
          size={25}
          className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
        />
      ) : (
        <TbMenu2 size={25} className="text-indigo-800" />
      )}
    </button>
  );
};

export default BurgerMenu;
