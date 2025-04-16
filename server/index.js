const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./core/errorHandler');
const connectDB = require('./config/db');
const scheduleExpired = require('./config/checkExpired');
const scheduleOverdate = require('./config/checkOverdate');
const routers = require('./routes/index');
const port = process.env.PORT || 5000;

connectDB();
scheduleExpired();
scheduleOverdate();

const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routers);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.get('/', (req, res) => res.send('API is running...'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));