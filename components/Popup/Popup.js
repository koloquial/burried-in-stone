"use client";
import { FaTimes } from "react-icons/fa";

export default function Popup({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {children} {/* Dynamic content */}
                <button className="popup-close" onClick={onClose}><FaTimes className="close-icon" /></button>
                
            </div>
        </div>
    );
}
