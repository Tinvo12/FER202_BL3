import React from "react";

const Modal = ({ open, title, children, onClose, onConfirm, confirmLabel = "OK" }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" aria-label="Close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {onConfirm ? (
            <>
              <button className="btn-secondary" onClick={onClose}>Hủy</button>
              <button className="btn-primary" onClick={onConfirm}>{confirmLabel}</button>
            </>
          ) : (
            <button className="btn-primary" onClick={onClose}>Đóng</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
