import React from "react";
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
    if (!isOpen) {
        return null;
    }

    return (
        <article id="modal-container">
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
