import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather } from './WeatherAPI';
import './styles.css'; // Import CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = { latitude: 40.7128, longitude: -74.0060 }; // Example location (New York)
        const data = await fetchCurrentWeather(location.latitude, location.longitude);
        setWeatherData(data); // Update state with fetched data
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Too many requests, retry after exponential backoff
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff formula
          setRetryCount(retryCount + 1);
          setTimeout(fetchData, delay);
        } else {
          setError('Failed to fetch weather data. Please try again later.');
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchData(); // Invoke the fetch function
  }, [retryCount]); // Retry whenever retryCount changes

  return (
    <div className="weather-container"> {/* Apply the CSS class */}
      <h2>Current Weather</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        weatherData && weatherData.data && weatherData.data.timelines[0] ? (
          <div>
            <p>Temperature: {weatherData.data.timelines[0].intervals[0].values.temperature}</p>
            <p>Description: {weatherData.data.timelines[0].intervals[0].values.weatherCode}</p>
            {/* Add more weather details as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )
      )}
    </div>
  );
}

export default Weather;
