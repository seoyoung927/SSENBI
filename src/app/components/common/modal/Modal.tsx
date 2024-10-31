import React, { ReactNode } from "react";
import "./Modal.css";
import XIcon from "@/app/assets/svg/X.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, onConfirm, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="modal-cancel" onClick={onClose}>
            취소
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
