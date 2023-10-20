import mongoose from 'mongoose';

const MONGO_URL = `mongodb+srv://tkny:rtqXXOCvX14ELCcP@projects.b6qz5b8.mongodb.net/Projects?retryWrites=true&w=majority`
mongoose.Promise = Promise;
const database = () => {
  const connectionParams: {} = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  try {
    mongoose.connect(MONGO_URL, connectionParams);
    console.log('Database connection successful.')
  } catch (error) {
    console.log('Database connection failed: ', error)
  }
}

module.exports = {
  database
}
