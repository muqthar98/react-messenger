import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Overlay } from "../overlay/Overlay";

import styles from "./modal.module.css";
import { IconSVG } from "../icon/IconSVG";

const ModalContext = createContext();

const Modal = ({ children, defaultIsOpen = false }) => {
  const [closed, setClosed] = useState(defaultIsOpen ? false : true);
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const openModal = () => {
    setClosed(false);
    setIsOpen(true);
  };
  const closeModal = (e) => {
    e && e.preventDefault();
    setClosed(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };
  return (
    <ModalContext.Provider value={{ isOpen, closed, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children }) => {
  const { openModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: openModal });
};

const Close = ({ children }) => {
  const { closeModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: closeModal });
};

const Window = ({ children }) => {
  const { isOpen, closeModal, closed } = useContext(ModalContext);
  const windowRef = useRef();
  useEffect(() => {
    // function to close the modal while click outside the modal
    const handler = (e) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        closeModal();
      }
    };
    // add EventListener to the click event
    document.addEventListener("click", handler, true);

    // remove EventListener to the click event
    return () => document.removeEventListener("click", handler);
  }, [closeModal]);

  if (!isOpen) return null;
  return (
    <Overlay>
      <div
        className={`${styles.modal} ${closed ? styles.modal__closed : ""}`}
        ref={windowRef}
      >
        <IconSVG iconName={"close"} onClick={closeModal} />
        {children}
      </div>
    </Overlay>
  );
};

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

const useModelContext = () => {
  return useContext(ModalContext);
};

export { Modal, useModelContext };
