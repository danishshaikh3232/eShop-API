require('dotenv').config();  

const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/keys'); // Fixed path issue
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express(); // Initialize app here
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
