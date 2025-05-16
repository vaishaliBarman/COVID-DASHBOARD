// This is the base URL to get historical COVID-19 data
const COVID_API_BASE = 'https://disease.sh/v3/covid-19/historical';

// This is the URL to get the list of all countries
const COUNTRIES_API = 'https://restcountries.com/v3.1/all';

/**
 * Fetches COVID-19 historical data for a given country.
 * @param {string} countryCode - The country code (default is 'usa')
 * @returns {object|null} - Returns data or null if there’s an error
 */
export const fetchCovidData = async (countryCode = 'usa') => {
  try {
    // Request COVID-19 data for the selected country for the last 1500 days
    const response = await fetch(`${COVID_API_BASE}/${countryCode}?lastdays=1500`);

    // If the request failed, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch COVID data for ${countryCode}: ${response.status}`);
    }

    // Convert the response into JSON
    const data = await response.json();

    // Check if the data contains a 'timeline' (which holds the COVID history)
    if (!data.timeline) {
      throw new Error(`No timeline data found for ${countryCode}`);
    }

    // Return the valid data
    return data;
  } catch (error) {
    // If there is any error, print it and return null
    console.error('[COVID DATA ERROR]', error);
    return null; 
  }
};

/**
 * Fetches a list of all countries with their names and 2-letter codes.
 * @returns {Array} - Returns a list of countries (name and code)
 */
export const fetchCountries = async () => {
  try {
    // Request the full list of countries
    const response = await fetch(COUNTRIES_API);

    // If the request failed, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}`);
    }

    // Convert the response into JSON
    const data = await response.json();

    // Filter the list to include only countries with a name and code
    const filtered = data
      .filter((c) => c.name?.common && c.cca2)
      .map((country) => ({
        name: country.name.common,       // Country name (e.g., "India")
        code: country.cca2.toLowerCase() // Country code in lowercase (e.g., "in")
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    return filtered;
  } catch (error) {
    // If there is any error, print it and return an empty list
    console.error('[COUNTRY FETCH ERROR]', error.message);
    return [];
  }
};
