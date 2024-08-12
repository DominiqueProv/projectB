import { useState, useEffect, useRef } from "react";

let modalCount = 0;

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalCount === 0) {
      document.body.style.overflow = "hidden";
    }
    modalCount += 1;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  // Cleanup to ensure modalCount is correctly managed
  useEffect(() => {
    if (!isOpen && modalCount > 0) {
      modalCount -= 1;
      if (modalCount === 0) {
        document.body.style.overflow = "unset";
      }
    }
  }, [isOpen]);

  return { isOpen, openModal, closeModal, modalRef };
};

export default useModal;
