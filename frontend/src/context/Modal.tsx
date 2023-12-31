// frontend/src/context/Modal.js
import React, { useRef, useState, useContext, RefObject } from 'react';
import { ChildrenProviderProps } from '../interfaces';
import ReactDOM from 'react-dom';
import './Modal.css';

// set the type for modalcontext
export type ModalContextType = {
  // don't need these nulls because ReactNode and HTMLElement already include null in their types
  // modalRef: RefObject<HTMLElement> | null;
  // modalContent: React.ReactNode | null;
  modalRef: RefObject<HTMLElement>;
  modalContent: React.ReactNode;

  // setstate functions
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setOnModalClose: React.Dispatch<React.SetStateAction<Function>>;
  closeModal: () => void | null;
};

// set it to an object and cast to modalcontexttype instead of using null in createcontext
const ModalContext = React.createContext<ModalContextType>({} as ModalContextType);

export function ModalProvider({ children }: ChildrenProviderProps): JSX.Element {

  // modalref is an htmlelement
  const modalRef = useRef<HTMLDivElement>(null);
  const [ modalContent, setModalContent ] = useState<React.ReactNode>(null);

  // callback function that will be called when modal is closing
  const [ onModalClose, setOnModalClose ] = useState<Function | null>(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose(null);
    }
  };

  const contextValue: ModalContextType = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  // modalprovider uses the provider wrapper over the part of the application you want the context to include
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <div ref={modalRef}></div>
    </ModalContext.Provider>
  );
};

export function Modal() {
  // if (ModalContext === null) return (<>Error: no ModalContext</>)
  const { modalRef, modalContent, closeModal } = useContext<ModalContextType>(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={closeModal} />
      <div id='modal-content'>{modalContent}</div>
    </div>,
    modalRef.current
  )
}

// useContext to access the values in the context
export const useModal = () => useContext(ModalContext);
