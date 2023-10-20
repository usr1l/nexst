module.exports = {
  environment: process.env.NODE || 'development',
  port: process.env.PORT || 5000,
  // dbFile: process.env.DB_FILE,
  dbUrl: process.env.MONGO_URL || ''

};
