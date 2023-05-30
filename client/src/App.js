import React, { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState({});
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    fetch(`/api?zip=${zipCode}`)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [zipCode]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setZipCode(event.target.elements.zipCode.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="zipCode" placeholder="Enter ZIP code" />
        <button type="submit">Submit</button>
      </form>
      {typeof backendData.weather === 'undefined' ? (
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
