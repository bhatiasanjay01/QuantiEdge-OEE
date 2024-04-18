import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [response, setResponse] = useState('');
  const API_KEY = "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";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "user",
                "content": "How to process CSV files and/ or JSON data using OpenAI APIs"
              }
            ]
          },
          { headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
            
          } },
        );
        setResponse(response.data.choices[0].message.content);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, );
  
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
      <h1>OpenAI React Demo</h1>
      <p>{response}</p>
    </div>
      </header>


    </div>



  );
}

export default App;
