module.exports = {
  environment: process.env.NODE || 'development',
  port: process.env.PORT || 5000,
  // dbFile: process.env.DB_FILE,
  MONGO_URL: process.env.MONGO_URL
};
