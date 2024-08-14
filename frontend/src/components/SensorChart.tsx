import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SensorChart: React.FC = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("24h");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/sensors/average?period=${period}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch average sensor data:", error);
      }
    };

    fetchData();
  }, [period]);

  return (
    <div>
      <h2>Average Sensor Data</h2>
      <select onChange={(e) => setPeriod(e.target.value)} value={period}>
        <option value="24h">Last 24 Hours</option>
        <option value="48h">Last 48 Hours</option>
        <option value="1w">Last 1 Week</option>
        <option value="1m">Last 1 Month</option>
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="equipmentId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="_avg.value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
