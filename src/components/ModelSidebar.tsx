import { useState } from "react";
import AddApplianceModal from "./AddApplianceModal";
import "../styles/modelSidebar.css";
import "../styles/modal.css";
import PlusIcon from "../assets/icons/plus";
import { model as modelData } from "../data/models";

interface ModelSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
    models: { type: string; position: [number, number, number] }[];
    onSelectModel: (index: number) => void;
    onDeleteModel: (index: number) => void;
}

function ModelSidebar({
    onAddCabinet,
    onAddFridge,
    models,
    onSelectModel,
    onDeleteModel
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
                        <button onClick={() => onSelectModel(index)}>Select</button>
                            <button onClick={() => onDeleteModel(index) }>Delete</button>
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
                {modelData.map((item) => (
                    <div key={item.id} className="appliance-selection-card">
                        <img src={item.imagePath} alt={item.name} />
                        <div className="appliance-details">
                            <p>{item.name}</p>
                            <small>
                                {item.dimensions.width}W x{" "}
                                {item.dimensions.height}H x{" "}
                                {item.dimensions.depth}D
                            </small>
                            <small>{item.description}</small>
                        </div>
                        <div className="modal-button-container">
                            <button
                                onClick={() => {
                                    if (item.type === "cabinet") {
                                        onAddCabinet();
                                    } else {
                                        onAddFridge();
                                    }
                                    handleCloseModal();
                                }}
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </AddApplianceModal>
        </aside>
    );
}

export default ModelSidebar;
