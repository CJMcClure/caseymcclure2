const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json());

// Routes

app.use('/', require('./routes')(express));

// Server Active

module.exports = app.listen(port, () => { 
	console.log('Server running on port ', port);
})