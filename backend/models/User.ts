import mongoose, { CallbackError, CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
import * as express from 'express';
import bcrypt from 'bcryptjs';


export interface User {
  username: string,
  email: string,
  password: string
}

// create the schema
const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
  // authentication: {
  // select false means we don't want this field when patching data
  // password: { type: String, required: true, select: false },
  // salt: {type: String, select: false},
  // sessionToken: { type: String, select: false }
  // }
},
  {
    timestamps: true
  })

// middleware for hashing password with bcrypt
// mark anon function as 'function' because arrow functions don't have 'this' context
// called before saving a user

// use this type for 'save' next function
UserSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    next(error);
  }
})

// // this fires after saving a user
// UserSchema.post('save', async function (next: CallbackWithoutResultAndOptionalError) {
//   try {
//     // console.log('after')

//   } catch (error: any) {
//     next(error);
//   }
// })

// create the model
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
