require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./src/configs/db');
const UserRoutes = require('./src/controllers/user.controller.js');
const AuthRoutes = require('./src/controllers/auth.controller.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://form-login-49ah.vercel.app', // or '*'
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: 'Content-Type,Authorization'
}));


// Routes
app.get('/', (req, res) => {
  res.send('Hello Yousub Here, Home page');
});

app.get('/', (req, res) => {
  res.send('Welcome to my Api');
});

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, async () => {
  try {
    await ConnectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit process with failure
  }
});
