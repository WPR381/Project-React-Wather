async function getWeather(userZip) {
    const axios = require('axios');
    const apiKey = '62def647d082226c2ed99bf2b8fa60e0'; 
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${userZip},ZA&appid=${apiKey}`;
  
    if (userZip.length == 4) {
      try {
        const response = await axios.get(url);
        const weatherDescription= response.data.weather[0].description;
        const weatherData = response.data.weather[0].main;
        const temperature = (response.data.main.temp - 273.15).toFixed(2);
        const humidity = response.data.main.humidity;
        const windSpeed = response.data.wind.speed;
  
        return {
          description:weatherDescription,
          weather: weatherData,
          temp: temperature,
          wind: windSpeed,
          humidity: humidity
        };
      } catch (error) {
        console.log('Error fetching weather data:', error);
        return null;
      }
    } else {
      console.log('Incorrect zip');
      return null;
    }
  }

  //main(userZip);
  module.exports=
{
    getWeather,
    
}