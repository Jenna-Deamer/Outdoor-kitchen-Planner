interface ProductSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
}

function ProductSidebar({ onAddCabinet, onAddFridge }: ProductSidebarProps) {
    return (
        <aside>
            <h2>Product Sidebar</h2>
            <div>
                <button onClick={onAddCabinet}>Add Cabinet</button>
                <button onClick={onAddFridge}>Add Fridge</button>
            </div>
        </aside>
    );
}

export default ProductSidebar;