import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    // select false means we don't want this field when patching data
    // password: { type: String, required: true, select: false },
    // salt: {type: String, select: false},
    sessionToken: { type: String, select: false }
  }
})
