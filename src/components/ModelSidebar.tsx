import { Key } from "react";
import "../styles/modelSidebar.css";

interface ModelSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
    models: { type: string; position: [number, number, number] }[];
}

function ProductSidebar({ onAddCabinet, onAddFridge, models }: ModelSidebarProps) {
    return (
        <aside>
        <div id="sidebar-header">
                <h2>Design Tools</h2>
                <button id="add-appliance-btn" onClick={() => {}}>
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
        </aside>
    );
}

export default ProductSidebar;
