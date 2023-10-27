// frontend/src/context/Modal.js
import React, { useRef, useState, useContext, RefObject } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { ChildrenProviderProps } from '../interfaces';

const ModalContext = React.createContext<ModalContextType | null>(null);

// set the type for modalcontext
export type ModalContextType = {
  // don't need these nulls because ReactNode and HTMLElement already include null in their types
  // modalRef: RefObject<HTMLElement> | null;
  // modalContent: React.ReactNode | null;
  modalRef: RefObject<HTMLElement> | null;
  modalContent: React.ReactNode | null;
  setModalContent: (content: React.ReactNode) => void | null;
  setOnModalClose: (callback: () => void) => void | null;
  closeModal: () => void | null;
};

export function ModalProvider({ children }: ChildrenProviderProps): React.ReactNode {

  // modalref is an htmlelement
  const modalRef = useRef<HTMLDivElement>(null);

  const [ modalContent, setModalContent ] = useState<React.ReactNode>(null);
  // callback function that will be called when modal is closing
  const [ onModalClose, setOnModalClose ] = useState<(() => void) | null>(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue: ModalContextType = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <div ref={modalRef}></div>
    </ModalContext.Provider>
  )
}

// export function Modal() {
//   const { modalRef, modalContent, closeModal } = useContext(ModalContext);
//   // If there is no div referenced by the modalRef or modalContent is not a
//   // truthy value, render nothing:
//   if (!modalRef || !modalRef.current || !modalContent) return null;

//   // Render the following component to the div referenced by the modalRef
//   return ReactDOM.createPortal(
//     <div id="modal" >
//   <div id="modal-background" onClick = { closeModal } />
//   <div id="modal-content" >
//   { modalContent }
//   < /div>
//   < /div>,
//     modalRef.current
//   );
// }

// export const useModal = () => useContext(ModalContext);
