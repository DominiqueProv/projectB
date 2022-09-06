const BackDrop = ({ setShowModal, showModal }) => {
  return (
    <div
      onClick={() => setShowModal(false)}
      className={`inset-0 absolute bg-black bg-opacity-30 z-10 backdrop-blur-sm ${
        showModal ? "block" : "hidden"
      }`}
    ></div>
  );
};

export default BackDrop;
