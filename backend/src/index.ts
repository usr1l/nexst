import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import csurf from 'csurf';
const morgan = require('morgan');
const { database } = require('../config/database.ts');
const { server } = require('../config/server');
const { environment } = require('../config/index');

export const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
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


database();
server();
