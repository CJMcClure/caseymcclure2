const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index.js');

const port = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', require('./router/main.js')(express));

db.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
   });

module.exports = app.listen(port, () => { 
	console.log('Server running on port ', port);
});

