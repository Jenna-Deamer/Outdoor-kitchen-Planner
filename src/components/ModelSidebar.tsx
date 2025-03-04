import { Key, useState } from "react";
import AddApplianceModal from "../components/AddApplianceModal";
import "../styles/modelSidebar.css";

interface ModelSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
    models: { type: string; position: [number, number, number] }[];
}

function ProductSidebar({ onAddCabinet, onAddFridge, models }: ModelSidebarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () =>{
        setIsModalOpen(true);
    }

    const handleCloseModal = () =>{
        setIsModalOpen(false);
    }
    return (
        <aside>
            <div id="sidebar-header">
                <h2>Design Tools</h2>
                <button id="add-appliance-btn" onClick={handleOpenModal}>
                    Add Appliance
                </button>
            </div>
            <div id="sidebar-model">
                {models.map((model: { type: string; }, index: Key | null | undefined) => (
                    <div key={index} className="model-control-card">
                        <h3>{model.type.charAt(0).toUpperCase() + model.type.slice(1)}</h3> {/* Capitalize first letter */}
                        <button>Select</button>
                        <button>Delete</button>
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
                <button onClick={onAddCabinet}>Add Cabinet</button>
                <button onClick={onAddFridge}>Add Fridge</button>
            </AddApplianceModal>
        </aside>
    );
}

export default ProductSidebar;
