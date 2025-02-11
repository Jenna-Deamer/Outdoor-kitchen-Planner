import { useState } from 'react';
import "../styles/CounterSelection.css";

interface CounterSelectionProps {
    onSelectCounter: (counterType: string) => void;
}

function CounterSelection({ onSelectCounter }: CounterSelectionProps) {
    const [selectedCounter, setSelectedCounter] = useState<string | null>(null);

    function handleSelectCounter(counterType: string): void {
        setSelectedCounter(counterType);
        onSelectCounter(counterType); // Call the callback function passed from App
        console.log(`Selected counter type: ${counterType}`);
    }

    return (
        <div className='counter-selection-container'>
            <h1>Select your Counter Type</h1>

<div className='counter-buttons'>
            <article>
                <h2>Straight Counter</h2>
                <button onClick={() => handleSelectCounter('straight')}>Select</button>
            </article>

            <article>
                <h2>L-Shaped Counter</h2>
                <button onClick={() => handleSelectCounter('l-shaped')}>Select</button>
            </article>

            {selectedCounter && (
                <div>
                    <h2>You have selected: {selectedCounter}</h2>
                </div>
            )}
        </div>
        </div>
    );
}

export default CounterSelection;