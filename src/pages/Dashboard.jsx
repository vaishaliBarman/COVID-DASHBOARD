import { useState, useEffect } from "react";
import axios from "axios";
import StatisticsCards from "../components/ Static.jsx";
import LineChartComponent from "../components/LineChart.jsx";
import PieChartComponent from "../components/PieChart.jsx";
import Loader from "../components/Loader.jsx";
import 'animate.css';
import '../App.css'; // Custom CSS for layout and animation

const Dashboard = () => {
  // Main state variables
  const [country, setCountry] = useState("usa");
  const [countries, setCountries] = useState([]);
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState("1500");

  // Fetch country list on initial render
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          iso: country.cca2.toLowerCase(),
        }));
        // Sort countries alphabetically by name
        setCountries(countryData.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Function to fetch COVID-19 data for the selected country
  const fetchData = () => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=${dateRange}`)
      .then((response) => {
        // Extract the 'timeline' data from the response
        setCovidData(response.data.timeline);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  };

  // Re-fetch data whenever country or dateRange changes
  useEffect(() => {
    fetchData();
  }, [country, dateRange]);

  return (
    <div className="container my-3 mb-5">
      
      <h1 className="text-center mt-4" id="top-header">COVID-19 DASHBOARD</h1>
      
      {/* Country dropdown */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="usa">United States</option>
            {/* Display all other countries */}
            {countries.map(
              (c) =>
                c.iso !== "us" && (
                  <option key={c.iso} value={c.iso}>
                    {c.name}
                  </option>
                )
            )}
          </select>
        </div>
      </div>

      {/* Show loading, error, or data content */}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : covidData ? (
        <>
          {/* Summary cards */}
          <div className="animate__animated animate__fadeIn  position-relative">
            <StatisticsCards data={covidData} />
          </div>

          {/* Charts */}
          <div className="row gy-4 animate__animated animate__fadeInUp">
            <div className="col-lg-6">
              <div className="chart-box h-100">
                <LineChartComponent data={covidData} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chart-box h-100">
                <PieChartComponent data={covidData} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
