import { useState } from "react";
import './App.css';

function App() {
  const [items, setItems] = useState(["A", "B", "C", "D"]);
  const [timerId, setTimerId] = useState(null);
  let reordered;
  const reorderInRealTime = (input) => {
    setTimeout(function runner(param = input) {
      reordered = reorderFn(param);
      setItems(reordered);
      const timerId = setTimeout(() => runner(reordered), 2000);
      setTimerId(timerId)
    }, 2000);
  }
  const reorderFn = (arr) => {
    return [...arr.slice(1, arr.length), arr[0]];
  }

  const onChange = (event) => {
    console.log('Input:value', event.target.value)
  }
  const handleStopProcess = () => {
    clearTimeout(timerId);
  }
  const handleStartProcess = () => {
    reorderInRealTime(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className='button' onClick={handleStartProcess}>Start process</button>
        <input type="text" className="test-input" onChange={onChange}/>
        <div className="card-container">
          {items.map((item) => <p key={item} className='card-item'>{item}</p>)}
        </div>
        <button className='button' onClick={handleStopProcess}>Stop process</button>
      </header>
    </div>
  );
}

export default App;
