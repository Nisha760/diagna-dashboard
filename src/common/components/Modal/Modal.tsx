
import { ReactNode } from 'react';
import { IoCloseOutline } from "react-icons/io5";


import styles from './Modal.module.css';


type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={onClose}>
          <IoCloseOutline/>
        </button>
        {children}
      </div>
    </div>
  );
};

