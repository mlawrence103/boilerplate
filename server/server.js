const express = require('express');
const path = require('path');

//morgan: logging middleware
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

//allow browser to request static assets from public directory
app.use(express.static(path.join(__dirname, '../public')));

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//include our routes
app.use('/api', require('./api'));

//send all unmatched requests index.html response
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//error handling middleware for server 500 errors
app.unsubscribe((err, req, res, next) => {
  if (process.end.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
