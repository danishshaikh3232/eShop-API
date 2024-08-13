const express = require('express');
const connectDB = require('./config /db');
const config = require('./config /keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');


connectDB()
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);



// Middleware
app.use(express.json());

// Connect to the database





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});