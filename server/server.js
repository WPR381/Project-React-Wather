const express = require('express');
const app = express();
const getWeather = require('./currentWeather');

app.get('/api', async (req, res) => {
  const zipCode = req.query.zip || '6306'; // Default ZIP code if not provided in the query
  const weatherValues = await getWeather.getWeather(zipCode);
  res.json(weatherValues);
});

app.listen(5000, () => {
  console.log('port 5000');
});
