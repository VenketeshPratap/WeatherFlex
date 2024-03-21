import React, { useState, useEffect } from 'react';
import { fetchForecastWeather } from './ForecastAPI';
import './styles.css';
const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = { latitude: 40.7128, longitude: -74.0060 }; // Example location (New York)
        const data = await fetchForecastWeather(location.latitude, location.longitude);
        setForecastData(data); // Update state with fetched data
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError('Failed to fetch forecast data. Please try again later.');
          console.error('Error fetching forecast data:', error);
        }
      }
    };

    fetchData(); // Invoke the fetch function
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div className="forecast-container">
      <h2>Forecast Weather</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        forecastData && forecastData.data && forecastData.data.timelines[0] ? (
          forecastData.data.timelines[0].intervals.map((interval, index) => (
            <div key={index}>
              <p>Date: {interval.startTime}</p>
              <p>Temperature: {interval.values.temperature}</p>
              <p>Description: {interval.values.weatherCode}</p>
              {/* Add more forecast details as needed */}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )
      )}
    </div>
  );
}

export default Forecast;
