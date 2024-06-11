require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const ConnectDB = require('./src/configs/db');
const UserRoutes = require('./src/controllers/user.controller');
const AuthRoutes = require('./src/controllers/auth.controller');

// Define allowed origins
const allowedOrigins = ['https://form-login-49ah.vercel.app'];

// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204 // For legacy browser support
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello Yousub Here, Home page');
});

app.get('/msg', (req, res) => {
  res.send('Welcome to my Api');
});

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, async () => {
  try {
    await ConnectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit process with failure
  }
});
