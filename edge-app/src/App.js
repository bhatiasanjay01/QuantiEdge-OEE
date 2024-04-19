import React, {useState} from 'react';
import './App.css';

function App() {
  
  const [response, setResponse] = useState('');
  const handleClick = () => {
    fetch('http://localhost:3001/calculate-oee', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => setResponse(data.result))
    .catch(error => console.error('Error:', error));
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {/* Dropdown selection for plants */}
        <div className="dropdown">
          <label htmlFor="plant-selector">Select your plant</label>
          <select id="plant-selector">
            <option value="plant1">Plant 1</option>
            <option value="plant2">Plant 2</option>
            <option value="plant3">Plant 3</option>
            <option value="plant4">Plant 4</option>
          </select>
        </div>

        {/* Cards for machinery */}
        <div className="card-container">
          <div className="card">Hydraulic Press</div>
          <div className="card">CNC Machine</div>
        </div>
        <div>
      <h1>Machine OEE Demo</h1>
      <button onClick={handleClick}>Click Here for OEE</button>
      <p>{response}</p>
    </div>
      </header>


    </div>



  );
}

export default App;
