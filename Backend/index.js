require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./src/configs/db');
const UserRoutes = require('./src/controllers/user.controller');
const AuthRoutes = require('./src/controllers/auth.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const allowedOrigins = ['https://form-login-49ah.vercel.app', 'https://example.com'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Routes
app.get('/', (req, res) => {
    res.send('Hello Yousub Here, Home page');
});

app.get('/msg', (req, res) => {
    res.send('Welcome to my Api');
});

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

// Start server
app.listen(PORT, async () => {
    try {
        await ConnectDB();
        console.log(`Connected on ${PORT}`);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
    }
});
