import { useEffect } from "react";

export default function Toast({message, type="info", onClose, duration=3000}) {
   useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), duration)
      return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            background: type === "error" ? "#B91C1C" : "#111827",
            color: "white",
            padding: "0.6rem 1rem",
            borderRadius: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
            <span>{message}</span>
        <button className="toast-btn" onClick={() => onClose?.()}
            style={{
            marginLeft: 8,
            background: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
        }}>X</button>
        </div>
    )
}