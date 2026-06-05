import react, {useMemo} from 'react';
import './App.css';

function App2() {
    const [count, setCount] = react.useState(0);
    const[text, setText] = react.useState("");

    const expensiveCalculation = useMemo(() => {
        console.log("Expensive calculation...");
        return count * 2;
    }, [count]);
    return (
        <div>
            <h1>Count : {count}</h1>
            <h2>Expensive Calculation : {expensiveCalculation}</h2>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <br></br>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something"/>

        </div>
    );
}
export default App2;