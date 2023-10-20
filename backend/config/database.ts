import mongoose from 'mongoose';

const MONGO_URL = `mongodb+srv://tkny:5Be2W4IstyBsEl14@projects.b6qz5b8.mongodb.net/?retryWrites=true&w=majority`
mongoose.Promise = Promise;
const database = () => {
  const connectionParams: {} = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
