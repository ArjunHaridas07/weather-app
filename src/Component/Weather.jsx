import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = 'ef5a2a06f72b06ec539b1cc2ea2771a7';

  const handleSearch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response Data:', data);
        setWeatherData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="weather-app">
      <h1 className="weather-app-title">Weather App</h1>
      <div className="search-container">
        <label  htmlFor="cityInput" className="search-label">Enter City: </label>
        <input placeholder='Enter City Name'
          type="text"
          id="cityInput"
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {weatherData ? (
        <div className="weather-info">
          <h2 className="city-name">
            {weatherData.name}_ {weatherData.sys && weatherData.sys.country}
          </h2>
          <div className="weather-data-container">
            <div className="weather-data-item">
              <i className="fas fa-thermometer-three-quarters fa-2x"></i>
              <p>Temperature: {weatherData.main && (weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            </div>
            <div className="weather-data-item">
              <i className="fas fa-tint fa-2x"></i>
              <p>Humidity: {weatherData.main && weatherData.main.humidity}%</p>
            </div>
            <div className="weather-data-item">
              <i className="fas fa-cloud fa-2x"></i>
              <p>Weather: {weatherData.weather && weatherData.weather[0].description}</p>
            </div>
            <div className="weather-data-item">
              <i className="fas fa-wind fa-2x"></i>
              <p>Wind Speed: {weatherData.wind && weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default Weather;
