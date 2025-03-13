const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./api');

const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.BACKEND_PORT || 3000;

//whitelist isn't really working will fix later (or not 💀)

// const whitelist = ['http://localhost:3000', 'https://www.google.com, http:127.0.0.1:3000', 'http://localhost:8080'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionSuccessStatus: 200
// }

//custom middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`);
    next();
});

app.use (cors());
app.use(errorHandler);

//built-in middleware
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

//middleware for cookies
app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

routes(app);

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});