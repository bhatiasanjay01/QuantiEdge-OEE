import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    //axios.get('/api/alerts?plant=default')  // Replace 'default' with the actual plant if needed

    axios.get('http://localhost:5000/api/alerts') 
      .then(response => setAlerts(response.data))
      .catch(error => console.error('Error fetching alerts:', error));
  }, []);

  if (!alerts || alerts.length === 0) return <p>No alerts</p>;

  return (
    <div className="alerts-panel">
      <h2>Alerts</h2>
      <div>
        {alerts.map((alert, index) => (
          <div key={index} className="alert">
            <h3>{alert.machine}</h3>
            <p>{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsPanel;
