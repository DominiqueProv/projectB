import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser
    ? createPortal(children, document.getElementById("myportal"))
    : null;
};

export default Modal;
