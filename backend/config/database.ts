import mongoose from 'mongoose';

// allow use of environment variables
require('dotenv').config();
const { MONGO_URL } = require('./index.ts');

mongoose.Promise = Promise;
const database = () => {
  const connectionParams: {} = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
    mongoose.connect(MONGO_URL, connectionParams);
    console.log('Database connection successful.');
  } catch (error) {
    console.log('Database connection failed: ', error);
  };
};

module.exports = {
  database
};
