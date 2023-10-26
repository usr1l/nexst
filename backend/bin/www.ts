#!/usr/bin/env node
import http from 'http';
import app from '../app';
import mongoose from 'mongoose';
import { mongoURI, port } from "../config/index"

// allow use of environment variables
require('dotenv').config();

mongoose.Promise = Promise;
const database = () => {
  const connectionParams: Record<string, boolean> = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
    mongoose.connect(mongoURI, connectionParams);
    console.log('Database connection successful.');
  } catch (error) {
    console.log('Database connection failed: ', error);
  };
};

database();

http.createServer(app).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
