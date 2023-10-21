import mongoose, { CallbackError } from 'mongoose';
import * as express from 'express';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    // select false means we don't want this field when patching data
    password: { type: String, required: true, select: false },
    // salt: {type: String, select: false},
    sessionToken: { type: String, select: false }
  }
})

// // middleware for hashing password with bcrypt
// // mark anon function as 'function' because arrow functions don't have 'this' context
// // called before saving a user
// UserSchema.pre('save', async function (next: express.NextFunction) {
//   try {
//     // console.log('before')
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(, salt);
//   } catch (error) {
//     next(error);
//   }
// })

// // this fires after saving a user
// UserSchema.post('save', async function (next: express.NextFunction) {
//   try {
//     // console.log('after')

//   } catch (error) {
//     next(error);
//   }
// })


const UserModel = mongoose.model('User', UserSchema);



// actions for controllers
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessoionToken = (sessionToken: string) => UserModel.findOne({
  'authentication.sessionToken': sessionToken
});
export const getUsersById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then(user => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export default UserModel;
