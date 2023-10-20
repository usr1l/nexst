import mongoose from 'mongoose';

// allow use of environment variables
require('dotenv').config();
const { dbUrl } = require('./index.ts');

mongoose.Promise = Promise;
const database = () => {
  const connectionParams: {} = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
    mongoose.connect(dbUrl, connectionParams);
    console.log('Database connection successful.');
  } catch (error) {
    console.log('Database connection failed: ', error);
  };
};

module.exports = {
  database
};
