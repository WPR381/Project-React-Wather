const express = require('express');
const app = express();

const routes = require('./routes/routes');

app.use('/api', routes);

app.listen(5000, async () => {

  console.log('port 5000');
});
