"use client";

import { createPortal } from "react-dom";
import { useEffect, useSyncExternalStore } from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  open: boolean;
  cancel?: boolean;
  onCancel?: () => void;
}

const emptySubscribe = () => () => { };

export default function ConfirmModal({
  message,
  onConfirm,
  open,
  cancel = false,
  onCancel,
}: ConfirmModalProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isClient) return;

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isClient]);

  if (!open || !isClient) return null;

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">Alert</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          {cancel && onCancel && (
            <button className="modal-button cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button className="modal-button" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
