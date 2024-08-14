import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sensorDataView.css"; // Importe o CSS

interface SensorData {
  id: string;
  equipmentId: string;
  timestamp: string;
  value: number;
}

const SensorDataView: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sensors/data");
        setSensorData(response.data);
      } catch (error) {
        console.error("Failed to fetch sensor data", error);
      }
    };

    fetchData();
  }, []);

  // Calcular os dados da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sensorData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2>Sensor Data</h2>
      <table>
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((data) => (
            <tr key={data.id}>
              <td>{data.equipmentId}</td>
              <td>{new Date(data.timestamp).toLocaleString()}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(sensorData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SensorDataView;
