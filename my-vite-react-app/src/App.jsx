import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Delhi'); // Default city is set to London
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = '81de13c75b2773e34b54537355521db3'; // Your OpenWeatherMap API key
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]); // Set the first item in the list as air quality data
      })
      .catch(err => {
        console.error('Error fetching air quality data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch air quality data.');
      });
  };

  const fetchWeatherData = (city) => {
    const API_KEY = '81de13c75b2773e34b54537355521db3'; // Your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
      })
      .then(response => {
        setFiveDayForecast(response.data);
      })
      .catch(err => {
        console.error('Error fetching weather data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch weather data.');
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
