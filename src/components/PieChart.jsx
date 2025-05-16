 
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Pie.css"; // Include your custom styles

const COLORS = ["#007bff", "#dc3545", "#28a745"];

const PieChartComponent = ({ data }) => {
  if (!data || !data.cases || !data.deaths || !data.recovered) {
    return <div className="p-3">Loading data...</div>;
  }

  const dates = Object.keys(data.cases);
  const latestDate = dates[dates.length - 1];
    
  // Calculate active cases, deaths, and recovered for the latest date
  const chartData = [
    {
      name: "Active Cases",
      value:
        data.cases[latestDate] -
        (data.deaths[latestDate] + data.recovered[latestDate]),
    },
    { name: "Deaths", value: data.deaths[latestDate] },
    { name: "Recovered", value: data.recovered[latestDate] },
  ];

  return (
    <div className=" mt-5 pie-chart-container animate__animated animate__zoomIn">
      <div className="card-body">
        <h3 id="H2"className="card-title text-center  mb-3">COVID-19 Overview</h3>
        <ResponsiveContainer width="100%" aspect={1} height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              dataKey="value"
            
              labelLine={false}
              label={({ name, value }) =>
                `${name} (${value.toLocaleString()})`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => value.toLocaleString()}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
