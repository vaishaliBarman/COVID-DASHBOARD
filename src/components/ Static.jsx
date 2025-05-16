import React from "react";
import "../styles/StartCard.css"; // Custom CSS for the pill-style cards

const StartCard = ({ data }) => {
  // Calculate total number of cases, deaths, and recoveries
  const totalCases = Object.values(data.cases).reduce((sum, count) => sum + count, 0);
  const totalDeaths = Object.values(data.deaths).reduce((sum, count) => sum + count, 0);
  const totalRecovered = Object.values(data.recovered).reduce((sum, count) => sum + count, 0);

  // Prepare the statistics to display in the UI
  const stats = [
    {
      label: "Total Cases",
      value: totalCases.toLocaleString(), // Format number with commas
      percentage: "100%", // Total cases is the baseline (100%)
      color: "#7D8FFF", // Blue color
    },
    {
      label: "Recoveries",
      value: totalRecovered.toLocaleString(),
      percentage: ((totalRecovered / totalCases) * 100).toFixed(2) + "%", // Calculate recovery rate
      color: "#28a745", // Green color
    },
    {
      label: "Deaths",
      value: totalDeaths.toLocaleString(),
      percentage: ((totalDeaths / totalCases) * 100).toFixed(2) + "%", // Calculate death rate
      color: "#dc3545", // Red color
    },
  ];

  return (
    <div className="container d-flex flex-wrap justify-content-center">
      {/* Loop through each stat and render a styled card */}
      {stats.map((stat, index) => (
        <div className="stat-pill shadow-sm m-2" key={index}>
          {/* Header section of the pill */}
          <div className="pill-label" style={{ backgroundColor: stat.color }}>
            <div className="text-bold">{stat.label}</div>
            <small className="text-light">{stat.percentage}</small>
          </div>
          {/* Value section of the pill */}
          <div className="pill-value">
            <div className="text-bold">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StartCard;
