require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./src/configs/db');
const UserRoutes = require('./src/controllers/user.controller');
const AuthRoutes = require('./src/controllers/auth.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

const corsOptions = {
    origin: 'https://form-login-49ah.vercel.app', // Allow only this origin
    methods: 'GET,POST', // Allow only GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
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
