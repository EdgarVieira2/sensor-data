import React, { useState } from "react";
import axios from "axios";

const AddSensorData: React.FC = () => {
  const [equipmentId, setEquipmentId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [value, setValue] = useState<any | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipmentId || !timestamp || value === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("/api/sensors/data", {
        equipmentId,
        timestamp,
        value: parseFloat(value as any),
      });
      alert("Data added successfully!");
    } catch (error) {
      console.error("Failed to add sensor data:", error);
      alert("Failed to add sensor data.");
    }
  };

  return (
    <div className="add-sensor-data-container">
      <h2>Add Sensor Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="equipmentId">Equipment ID</label>
          <input
            type="text"
            id="equipmentId"
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timestamp">Timestamp</label>
          <input
            type="datetime-local"
            id="timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
};

export default AddSensorData;
