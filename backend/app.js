// Initialize your Express application.;
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

//Create a variable called isProduction that will be true if the environment is in production or not by checking the environment key in the configuration file(backend / config / index.js):

const { environment } = require('./config');
const isProduction = environment === 'production';

//Initialize the Express application:
const app = express();

// Connect the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

// Add the cookie - parser middleware for parsing cookies and the express.json middleware for parsing JSON bodies of requests with Content - Type of "application/json".
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable corsif not in production env
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// Add the routes to the Express application by importing with the other imports in backend / app.js and connecting the exported router to app after all the middlewares.;

// backend/app.js
const routes = require('./routes');

app.use(routes); // Connect all the routes

//Resource Not Found Error-Handler
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

//Sequelize Error-Handler
//The second error handler is for catching Sequelize errors and formatting them before sending the error response.


// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {

        if (err.fields.includes('email')) {
            err.message = "User already exists",
                err.status = 403,
                err.errors = { "email": "User with that email already exists" };
        } else if (err.fields.includes('username')) {
            err.message = "User already exists",
                err.status = 403,
                err.errors = { "username": "User with that username already exists" };
        }
        else {
            err.errors = err.errors.map((e) => e.message);
            err.title = 'Validation error';
        }
    }
    next(err);
});

// Error Formatter Error-Handler
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        // title: err.title || 'Server Error',
        message: err.message,
        statusCode: err.status,
        errors: err.errors
        // stack: isProduction ? null : err.stack
    });
});


module.exports = app;
