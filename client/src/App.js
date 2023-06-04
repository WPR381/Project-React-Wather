import React, { useState, useEffect } from 'react';
import './App.css';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

// decide which icon to display
function getWeatherIcon(condition) {
  switch (condition) {
    case 'Clear':
      return <WiDaySunny />;
    case 'Clouds':
      return <WiCloud />;
    case 'Rain':
      return <WiRain />;
    case 'Snow':
      return <WiSnow />;
    case 'Thunderstorm':
      return <WiThunderstorm />;
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      return <WiFog />;
    default:
      return <WiCloud />;
  }
}

// validation for zip code
function validateZipCode(zipCode) {
  // Regular expression pattern to validate ZIP code
  const zipCodePattern = /^\d{4}$/;
  return zipCodePattern.test(zipCode);
}


function App() {
  const [backendData, setBackendData] = useState({});
  const [zipCode, setZipCode] = useState('');
  const [invalidZipCode, setInvalidZipCode] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('C'); // Default to Celsius

  useEffect(() => {
    if (invalidZipCode) {
      // Reset backendData if the ZIP code is invalid
      setBackendData({});
    } else {
      fetch(`/api?zip=${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
        });
    }
  }, [zipCode, invalidZipCode]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputZipCode = event.target.elements.zipCode.value;
    const isValidZipCode = validateZipCode(inputZipCode);
    setInvalidZipCode(!isValidZipCode);
    if (isValidZipCode) {
      setZipCode(inputZipCode);
    } else {
      setBackendData({});
    }
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  // Convert temperature to the selected unit
  const getTemperature = (temp) => {
    if (temperatureUnit === 'F') {
      return Math.round((temp * 9) / 5 + 32) + '°F';
    }
    return temp + '°C';
  };

  return (
    <div class='container'>
      <h1>Weather Forecast</h1>
      
      {invalidZipCode ? (
        <p>Please enter a valid ZIP code.</p>
      ) : typeof backendData.weather === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <div className='weather-info'>
          <div className='icon'>{getWeatherIcon(backendData.weather)}</div>
          <p class='icon-name'>{backendData.description}</p>
          <div className='box'>
          <button className='temp' onClick={toggleTemperatureUnit}>Temperature: <FaTemperatureHigh /> {getTemperature(backendData.temp)}</button>
          <p>Wind: <FaWind /> {backendData.wind} m/s</p>
          <p>Humidity: <FaTint /> {backendData.humidity} g.m-3</p>
          
        </div>
        </div>
      )}
      <h2>Enter a ZA zip code below to get the current weather conditions for that zip location.</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="zipCode" placeholder="Enter ZIP code" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
