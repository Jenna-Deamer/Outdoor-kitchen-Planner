import React, { useEffect, useState } from "react";
import "../styles/modal.css";

interface AddApplianceModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AddApplianceModal: React.FC<AddApplianceModalProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    // State to handle animation
    const [isRendered, setIsRendered] = useState(false);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    
    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            // Small delay to trigger entrance animation after DOM insertion
            const timer = setTimeout(() => {
                setIsAnimatingIn(true);
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimatingIn(false);
            // Delay removing from DOM until animation completes
            const timer = setTimeout(() => {
                setIsRendered(false);
            }, 300); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);
    // If the modal is not open and not animating in, return null (shows no modal)
    if (!isRendered && !isOpen) {
        return null;
    }

    return (
        // Only applies the "open" class when isAnimatingIn is true
        <article id="modal-container" className={isAnimatingIn ? "open" : ""}>
            <div id="modal-content">
                <button id="modal-close-btn" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </article>
    );
};

export default AddApplianceModal;
