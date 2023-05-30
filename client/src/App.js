import React, { useState, useEffect } from 'react';

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="zipCode" placeholder="Enter ZIP code" />
        <button type="submit">Submit</button>
      </form>
      {invalidZipCode ? (
        <p>Please enter a valid ZIP code.</p>
      ) : typeof backendData.weather === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Weather: {backendData.weather}</p>
          <p>Temperature: {backendData.temp}</p>
          <p>Wind: {backendData.wind}</p>
          <p>Humidity: {backendData.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default App;
