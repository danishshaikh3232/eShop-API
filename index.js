const express = require('express');
const connectDB = require('./config /db');
const config = require('./config /keys');
const mongoose = require('mongoose');


const app = express();

// Middleware
app.use(express.json());

// Connect to the database
connectDB()
  .then(() => {
    const PORT = config.port || 3000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1); // Exit process with failure
  });
