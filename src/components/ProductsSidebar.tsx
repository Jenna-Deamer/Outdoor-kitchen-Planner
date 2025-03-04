import "../styles/productSidebar.css";

interface ProductSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
}

function ProductSidebar({ onAddCabinet, onAddFridge }: ProductSidebarProps) {
    return (
        <aside>
        <div id="sidebar-header">
                <h2>Design Tools</h2>
                <button className="add-appliance-btn" onClick={() => {}}>
                    Add Appliance
                </button>
            </div>
            <div className="sidebar-footer">
                <small>
                    Click on a model to select, then use the arrow keys
                    to&nbsp;move!
                </small>
            </div>
        </aside>
    );
}

export default ProductSidebar;
