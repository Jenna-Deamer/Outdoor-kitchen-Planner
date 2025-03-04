import React from "react";
import "../styles/AddApplianceModal.css";

interface AddApplianceModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AddApplianceModal: React.FC<AddApplianceModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) {return null;}

    return(
        <article id="modal-container">
           <div className="modal-content">
                <button id="modal-close" onClick={onClose}>&times;</button>
                {children}
            </div>
        </article>
    )
};

export default AddApplianceModal;