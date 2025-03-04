import { useState } from "react";
import AddApplianceModal from "../components/AddApplianceModal";
import "../styles/modelSidebar.css";
import "../styles/addApplianceModal.css";
import PlusIcon from "../assets/icons/plus.tsx";

interface ModelSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
    models: { type: string; position: [number, number, number] }[];
}

function ModelSidebar({
    onAddCabinet,
    onAddFridge,
    models,
}: ModelSidebarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <aside>
            <div id="sidebar-header">
                <h2>Design Tools</h2>
                <button id="add-appliance-btn" onClick={handleOpenModal}>
                    Add Appliance
                </button>
            </div>
            <div id="sidebar-model-list">
                {models.map((model, index) => (
                    <div key={index} className="model-control-card">
                        <h3>
                            {model.type.charAt(0).toUpperCase() +
                                model.type.slice(1)}
                        </h3>
                        <div className="model-control-buttons">
                            <button>Select</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div id="sidebar-footer">
                <small>
                    Click on a model to select, then use the arrow keys
                    to&nbsp;move!
                </small>
            </div>
            <AddApplianceModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Select an Appliance</h2>
                {/* Cabinet Card */}
                <div className="appliance-selection-card">
                    <img src="https://placehold.co/100x100" alt="Cabinet" />
                    <div className="appliance-details">
                        <p>Cabinet</p>
                        <small>36W x 24H x 24D</small>
                        <small>Standard 36-inch cabinet with two doors.</small>
                    </div>
                    <div className="modal-button-container">
                        <button
                            onClick={() => {
                                onAddCabinet();
                                handleCloseModal();
                            }}
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </div>
                {/* Fridge Card */}
                <div className="appliance-selection-card">
                    <img src="https://placehold.co/100x100" alt="Fridge" />
                    <div className="appliance-details">
                        <p>Fridge</p>
                        <small>30W x 70H x 30D</small>
                        <small>Stainless steel outdoor fridge</small>
                    </div>
                    <div className="modal-button-container">
                        <button
                            onClick={() => {
                                onAddFridge();
                                handleCloseModal();
                            }}
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </div>
            </AddApplianceModal>
        </aside>
    );
}

export default ModelSidebar;
