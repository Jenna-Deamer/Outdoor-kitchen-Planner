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
    selectedModelIndex: number | null;
}

function ModelSidebar({
    onAddCabinet,
    onAddFridge,
    models,
    onSelectModel,
    onDeleteModel,
    selectedModelIndex
}: ModelSidebarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    
    return (
        <>
          <button 
            className={`sidebar-toggle ${isSidebarOpen ? 'active' : ''}`} 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
          />
          
          <aside className={isSidebarOpen ? 'active' : ''}>
              <div id="sidebar-header">
                  <h2>Design Tools</h2>
                  <button id="add-appliance-btn" onClick={handleOpenModal}>
                      Add Appliance
                  </button>
              </div>
              <div id="sidebar-model-list">
                  {models.map((model, index) => (
                      <div key={index}
                      className={`model-control-card ${selectedModelIndex === index ? 'selected' : ''}`}
                      >
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
                  Select model, use arrow keys to move or the buttons
                  </small>
              </div>
          </aside>
          
      
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
        </>
    );
}

export default ModelSidebar;
