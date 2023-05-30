async function getWeather(userZip) {
    const axios = require('axios');
    const apiKey = '62def647d082226c2ed99bf2b8fa60e0'; 
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${userZip},ZA&appid=${apiKey}`;
  
    if (userZip.length == 4) {
      try {
        const response = await axios.get(url);
        const weatherData = response.data.weather[0].description;
        const temperature = response.data.main.temp;
        const humidity = response.data.main.humidity;
        const windSpeed = response.data.wind.speed;
  
        return {
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

  async function main(userZip) {
    
    const weatherValues = await getWeather(userZip);
    if (weatherValues) {
      const [weatherData, temperature, humidity, windSpeed] = weatherValues;
      console.log('Weather:', weatherData);
      console.log('Temperature:', temperature);
      console.log('Humidity:', humidity);
      console.log('Wind Speed:', windSpeed);
    }
  }
  
  //main(userZip);
  module.exports=
{
    getWeather,
    main
}