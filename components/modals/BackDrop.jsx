const BackDrop = ({ setShowModal, showModal }) => {
  const handleCloseModal = () => {
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "unset";
    }
    setShowModal(false);
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`inset-0 fixed bg-black bg-opacity-30 z-10 backdrop-blur-sm ${
        showModal ? "block" : "hidden"
      }`}
    ></div>
  );
};

export default BackDrop;
