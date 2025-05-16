 
import { useEffect, useState } from "react";
import axios from "axios";
const CovidTracker = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const [covidData, setCovidData] = useState(null);

  // Fetch countries on mount
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const formattedCountries = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2.toLowerCase(),
        }));
        setCountries(formattedCountries);
      })
      .catch((error) => {
        console.error("Failed to fetch countries:", error);
      });
  }, []);

  // Fetch COVID data whenever selectedCountry changes
  useEffect(() => {
    axios
      .get(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=1500`)
      .then((response) => {
        setCovidData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch COVID-19 data:", error);
      });
  }, [selectedCountry]);

  return (
    <div className="container my-3">
     
      {/* Country dropdown */}
      <div className="mb-3 ">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="form-select mx-auto w-auto"
        >
          <option value="usa">USA</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* COVID Data display */}
      <div>
        {covidData ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{covidData.country}</h5>
              <pre className="small">
                {JSON.stringify(covidData.timeline, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <p>Loading COVID-19 data...</p>
        )}
      </div>
    </div>
  );
};

export default CovidTracker;
