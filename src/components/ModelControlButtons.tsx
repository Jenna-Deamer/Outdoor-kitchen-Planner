import "../styles/modelControlButtons.css";

interface ModelControlButtonsProps {
    onMoveLeft: () => void;
    onMoveRight: () => void;
    disabled?: boolean;
}
function ModelControlButtons({ onMoveLeft, onMoveRight, disabled}: ModelControlButtonsProps) {
    return (
        <div className="model-controls-container">
            {/* Left arrow */}
            <button 
                             className={`movement-button left-button ${disabled ? 'disabled' : ''}`}
                onClick={onMoveLeft}
                disabled={disabled}
            >
                &#8592;  
            </button>
            {/* Right arrow */}
            <button 
                              className={`movement-button right-button ${disabled ? 'disabled' : ''}`}
                onClick={onMoveRight}
                disabled={disabled}
            >
                &#8594;  
            </button> 
        </div>
    );
}

export default ModelControlButtons;