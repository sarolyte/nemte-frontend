import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  message,
  btnTxt,
  secondBtnTxt,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal} tabIndex={-1}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalContent}>
          <p>{message}</p>
        </div>
        <div className={styles.confirmationBtns}>
          <button onClick={onConfirm}>{btnTxt}</button>
          <button onClick={onClose}>{secondBtnTxt}</button>
        </div>
      </div>
    </div>
  );
}
