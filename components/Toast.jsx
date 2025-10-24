import { useEffect } from "react";

export default function Toast({message, type="info", onClose, }){
   useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), duration)
      return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button onClick={() => onClose?.()}>X</button>
        </div>
    )
}