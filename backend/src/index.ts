import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
const morgan = require('morgan');
const { database } = require('../config/database.ts');
const { server } = require('../config/server');

export const app = express();

app.use(cors({
  credentials: true
}));

app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());


// sets headers to better secure app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// This middleware is provided by Express to parse incoming request bodies
// with the x-www-form-urlencoded content type. The { extended: false }
// option means it will use the querystring library to parse URL-encoded data.
app.use(express.urlencoded({ extended: false }));

app.use(express.json());


database();
server();
