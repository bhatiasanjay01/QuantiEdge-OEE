import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const OeePanel = () => {
  const [oeeData, setOeeData] = useState({});

  useEffect(() => {
   // axios.get('http://localhost:5000/api/oee?plant=default')  // Replace 'default' with the actual plant if needed

   axios.get('http://localhost:5000/api/oee') 
      .then(response => setOeeData(response.data))
      .catch(error => console.error('Error fetching OEE data:', error));
  }, []);

  if (!oeeData || Object.keys(oeeData).length === 0) return <p>Loading...</p>;

  return (
    <div className="oee-panel">
      <h2>Overall OEE</h2>
      <div className="oee-section">
        <div>
          <h3>Hydraulic Press</h3>
          <p>OEE: {oeeData.hydraulicPress.oee}</p>
          <p>Quality: {oeeData.hydraulicPress.quality}</p>
          <p>Performance: {oeeData.hydraulicPress.performance}</p>
          <p>Availability: {oeeData.hydraulicPress.availability}</p>
        </div>
        <div>
          <h3>CNC Machine</h3>
          <p>OEE: {oeeData.cncMachine.oee}</p>
          <p>Quality: {oeeData.cncMachine.quality}</p>
          <p>Performance: {oeeData.cncMachine.performance}</p>
          <p>Availability: {oeeData.cncMachine.availability}</p>
        </div>
      </div>
    </div>
  );
}

export default OeePanel;


