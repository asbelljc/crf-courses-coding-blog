require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const config = require('./config.js');

const PORT = process.env.PORT || 5001;

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

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? config.devAdminURL
        : /admin.jonathanasbell.com$/,
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use(cookieParser());

app.use(require('./routes/admin-user'));
app.use(require('./routes/blog-posts'));
app.use(require('./routes/images/index.js'));
app.use(require('./routes/sitemap/index.js'));

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
});
