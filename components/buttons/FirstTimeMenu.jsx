import { CgSmileMouthOpen } from "react-icons/cg";

const FirstTimeMenu = ({ setShowModal, showModal }) => {
  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    !showModal && (
      <button
        onClick={handleClick}
        className="bg-pink-400 z-30 p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
      >
        <CgSmileMouthOpen size={35} className="text-white" />
      </button>
    )
  );
};

export default FirstTimeMenu;
