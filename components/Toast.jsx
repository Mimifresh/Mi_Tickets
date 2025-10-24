import { useEffect } from "react";

export default function Toast({message, type="info", onClose, }){
   useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, [message, duration, onClose]);
})