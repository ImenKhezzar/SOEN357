const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./api');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://soen357.onrender.com',
    'https://soen357-1.onrender.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler);

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

routes(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});