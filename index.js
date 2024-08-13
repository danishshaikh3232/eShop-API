const express = require('express');
const connectDB = require('./config /db');
const config = require('./config /keys');
const mongoose = require('mongoose');


const app = express();

// Middleware
app.use(express.json());

// Connect to the database
connectDB()

const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});