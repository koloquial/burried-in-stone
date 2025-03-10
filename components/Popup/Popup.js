"use client";

export default function Popup({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {children} {/* Dynamic content */}
                <button className="popup-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
