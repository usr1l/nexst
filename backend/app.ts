import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import csurf from 'csurf';
import routes from './routes';
const morgan = require('morgan');
// const { database } = require('../config/database.ts');
// const { server } = require('../config/server');
const { environment } = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());

// use this instead of bodyparser
app.use(express.json());

// This middleware is provided by Express to parse incoming request bodies
// with the x-www-form-urlencoded content type. The { extended: false }
// option means it will use the querystring library to parse URL-encoded data.
app.use(express.urlencoded({ extended: false }));

const isProduction: boolean = environment === 'production';

if (!isProduction) app.use(cors({ credentials: true }));

// sets headers to better secure app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

const cookie: Record<string, any> = {
  secure: isProduction,
  sameSite: isProduction && "Lax",
  httpOnly: true
};

app.use(
  csurf({
    cookie
  })
);

app.use(routes);

// // Catch unhandled requests and forward to error handler.
// app.use((_req, _res, next) => {
//   const err = new Error("The requested resource couldn't be found.");
//   err.title = "Resource Not Found";
//   err.errors = [ "The requested resource couldn't be found." ];
//   err.status = 404;
//   next(err);
// });

// // Process sequelize errors
// app.use((err, _req, _res, next) => {
//   // check if error is a Sequelize error:
//   if (err instanceof ValidationError) {
//     err.errors = err.errors.map((e) => e.message);
//     err.title = 'Validation error';
//     // err.status = err.status ? err.status : 403;
//   }
//   next(err);
// });

// // Error formatter
// app.use((err, _req, res, _next) => {
//   res.status(err.status || 500);
//   console.error(err);
//   res.json({
//     // title: err.title || 'Server Error',
//     message: err.message,
//     statusCode: err.status,
//     errors: err.errors,
//     stack: isProduction ? null : err.stack
//   });
// });

export default app;