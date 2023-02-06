var express = require('express');
var app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', require('./routes'));
app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  });

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Server is running on port ${port}`);
    }
  });