const express = require('express');
const router = express.Router();
require('../currentWeather');
const getWeather = require('../currentWeather');

router.get('/', async (req, res) => {
  const zipCode = req.query.zip || '6306'; // Default ZIP code if not provided in the query
  const weatherValues = await getWeather.getWeather(zipCode);
  res.json(weatherValues);
});


module.exports = router;