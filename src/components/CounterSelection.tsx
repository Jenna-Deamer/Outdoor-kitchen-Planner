import "../styles/CounterSelection.css";

interface CounterSelectionProps {
    onSelectCounter: (counterType: string) => void;
}

function CounterSelection({ onSelectCounter }: CounterSelectionProps) {
    function handleSelectCounter(counterType: string): void {
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
            </div>
        </div>
    );
}

export default CounterSelection;