require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connect(process.env.DB_STRING);

mongoose.connection.on('error', function (error) {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }
});

mongoose.connection.on('open', function () {
  console.log('Connected to MongoDB database.');
});

app.use(helmet());

app.use(require('./routes/index.js'));

app.use('/assets', express.static(path.join(__dirname, '..', '..', 'assets')));

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
});
