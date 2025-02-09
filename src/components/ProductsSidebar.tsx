import { PlusIcon } from "../assets/icons/plus.tsx";
interface ProductSidebarProps {
    onAddCabinet: () => void;
    onAddFridge: () => void;
}

function ProductSidebar({ onAddCabinet, onAddFridge }: ProductSidebarProps) {
    return (
        <aside>
            <h2>Models</h2>
            <div className="product-list">
                <div className="product-item">
                    <div className="product-info">
                        <h4>Cabinet</h4>
                        <img src="https://placehold.co/80x80" alt="Cabinet" />
                    </div>
                    <button onClick={onAddCabinet}>
                        <PlusIcon />
                    </button>
                </div>
                <div className="product-item">
                    <div className="product-info">
                        <h4>Fridge</h4>
                        <img src="https://placehold.co/80x80" alt="Fridge" />
                    </div>
                    <button onClick={onAddFridge}>
                        <PlusIcon />
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default ProductSidebar;
