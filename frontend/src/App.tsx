import React from "react";
import UploadCSV from "./components/UploadCSV";
import SensorDataView from "./components/SensorDataView";
import SensorChart from "./components/SensorChart";
import AddSensorData from "./components/AddSensorData";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Sensor Data Dashboard</h1>
      <div className="grid">
        <div className="grid-item">
          <h2>Upload CSV</h2>
          <UploadCSV />
        </div>
        <div className="grid-item">
          <h2>Sensor Data Chart</h2>
          <SensorChart />
        </div>
      </div>
      <div className="grid-item">
        <AddSensorData />
      </div>
      <div className="table-container grid-item">
        <h2>Sensor Data</h2>
        <SensorDataView />
      </div>
    </div>
  );
};

export default App;
