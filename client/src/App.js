import React, { useState, useEffect } from 'react';
import './App.css';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';


function getWeatherIcon(condition) {
  switch (condition) {
    case 'clear sky':
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
//function requires Temp and Temp Type (1 = Farenheit else Celsius) converts temp from Farenheit to Celsius and vice versa
//function ConvertTemp(Temperature, TempType) {
//  if (TempType = 1){
//      var Temperature = (Temperature - 32) * 5/9; //convert from Farenheit to Celsius
 //     var TempType = 0; //0 = Celsius
 // }
//}

function validateZipCode(zipCode) {
  // Regular expression pattern to validate ZIP code
  const zipCodePattern = /^\d{4}$/;
  return zipCodePattern.test(zipCode);
}

function App() {
  const [backendData, setBackendData] = useState({});
  const [zipCode, setZipCode] = useState('');
  const [invalidZipCode, setInvalidZipCode] = useState(false);

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



  return (
    <div class='container'>
      <h1>Weather Forecast</h1>
      <h2>Enter a zip below to get the current weather conditions for that zip location.</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="zipCode" placeholder="Enter ZIP code" />
        <button type="submit">Submit</button>
      </form>
      {invalidZipCode ? (
        <p>Please enter a valid ZIP code.</p>
      ) : typeof backendData.weather === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <div className='weather-info'>
        <div className='icon'>{getWeatherIcon(backendData.weather)}</div> 
        <p class='icon-name'>{backendData.weather}</p>
          <p> Temperature: <FaTemperatureHigh /> {backendData.temp}°C</p>
          <p>Wind: <FaWind /> {backendData.wind}</p>
          <p> Humidity: <FaTint />{backendData.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default App;