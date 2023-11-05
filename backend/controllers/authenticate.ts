import { Request, Response } from 'express';
import { getUserByEmail, createUser, UserDocument } from '../models/User';
import bcrypt from 'bcryptjs';
import { setToken } from '../utils/auth';

// register new user
export const register = async function (req: Request, res: Response) {
  const { email, password, username, firstname, lastname } = req.body;

  if (!email || !password || !username || !firstname || !lastname) return res.status(400).json({ 'err': 'Missing signup credentials' });

  const existingUser: UserDocument | null = await getUserByEmail(email);
  if (existingUser) return res.status(400).json({ 'err': 'User already exists' });

  // new user info
  const userInfo = {
    email,
    username,
    password
  }

  await createUser(userInfo);
  const newUser: UserDocument | null = await getUserByEmail(email);
  if (!newUser) return res.status(400).json({ 'error': 'Failed to register new user' });
  // set token and then wait for login
  await setToken({ "id": newUser._id.toString(), "username": newUser.username });
  return await login(req, res);
};


// login user
export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ "error": "Missing login credentials" });

  const user: UserDocument | null = await getUserByEmail(email);
  if (!user) return res.status(404).json({ "email": "This user does not exist" });
  // compare sync compares passwords synchronously
  if (bcrypt.compareSync(password, user.password)) {
    const token = await setToken({ "id": user._id.toString(), "username": user.username });
    return res.json({ user, token });
  };

  return res.sendStatus(400).json({ 'password': 'Incorrect Password' });
};
