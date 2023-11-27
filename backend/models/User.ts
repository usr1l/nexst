import mongoose, { CallbackWithoutResultAndOptionalError, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
  username: string,
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  birthday: Date,
  profilePic: string
}

export interface UserDocument extends User, Document {};

// create the schema
const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthday: {type: Date, required: true},
  profilePic: {type: String, required: true}
}, {
  timestamps: true
});

// middleware for hashing password with bcrypt
// mark anon function as 'function' because arrow functions don't have 'this' context
// called before saving a user
// use this type for 'save' next function
UserSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  try {
    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    next(error);
  }
})

// // this fires after saving a user
// UserSchema.post('save', async function (next: CallbackWithoutResultAndOptionalError) {
//   try {
//   } catch (error: any) {
//     next(error);
//   }
// })

// create the model
const UserModel = mongoose.model('User', UserSchema);

// actions for controllers
export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then(user => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export const getUserByEmailNoPassword = (email: string) => UserModel.findOne({ email })
  .select('-password');

export default UserModel;
