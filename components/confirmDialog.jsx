
import React from "react";

export default function ConfirmDialog({ message, title, onConfirm, onCancel, open }) {
    if (!open) return null;

    return (
        <div role="dialog"
        aria-modal="true" 
        className="confirm-overlay"
        tabIndex="-1"
        onKeyDown={(e)=> e.key === "Escape" && onCancel()}>
        <div className="confirm-dialog" role="document">
                <h3 className="confirm-dialog-title">{title}</h3>
                <p className="confirm-dialog-message">{message}</p>
                <div className="confirm-dialog-actions">
                    <button className="confirm-dialog-confirm" onClick={onConfirm}>Confirm</button>
                    <button className="confirm-dialog-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}