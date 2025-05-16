 
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
 

const LineChartComponent = ({ data }) => {
  // Check if data is available and has the required structure
  if (!data || !data.cases || !data.deaths || !data.recovered) {
    return <div className="p-3">Loading data...</div>;
  }
 // Prepare the data for the chart
  const chartData = Object.entries(data.cases).map(([date, cases]) => ({
    date,
    Cases: cases,
    Deaths: data.deaths[date],
    Recovered: data.recovered[date],
  }));

  return (
    <div className=" mt-5 mb-4 animate__animated animate__fadeIn">
      <h3 id="H2"className="text-center mb-3">COVID-19 Trends Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid   strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 15 , fontWeight:600}} />
          <YAxis tick={{ fontSize: 11, fontWeight: 800 }} />
          <Tooltip />
          <Legend />
          {[
            { key: "Cases", color: "#007bff" },
            { key: "Deaths", color: "#dc3545" },
            { key: "Recovered", color: "#28a745" },
          ].map(({ key, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
