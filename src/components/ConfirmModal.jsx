import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ConfirmModal({
  message,
  onConfirm,
  open,
  cancel = false,
  onCancel,
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  if (!open) return null;
  const confirm = () => {
    onConfirm();
    open = false;
  };

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">Alert</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          {cancel && (
            <button className="modal-button cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button className="modal-button" onClick={confirm}>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
