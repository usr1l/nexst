import { Request, Response } from 'express';
import { getUserByEmail, createUser, UserDocument, User } from '../models/User';
import bcrypt from 'bcryptjs';
import { setTokenCookie } from '../utils/auth';

// register new user
export const register = async function (req: Request, res: Response) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) return res.status(400).json('Missing credentials');

  const existingUser: UserDocument | null = await getUserByEmail(email);
  if (existingUser) return res.status(400).json('User already exists');

  // new user info
  const userInfo: Record<string, any> = {
    email,
    username,
    password
  }

  await createUser(userInfo);
  const newUser: UserDocument | null = await getUserByEmail(email);

  if (!newUser) return res.status(400).json('Failed to register new user');

  await setTokenCookie(res, { "id": newUser._id, "username": newUser.username });
  return res.status(200).json(newUser);
};


// login user
export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ "error": "Missing login credentials" })

  const user: UserDocument | null = await getUserByEmail(email);
  if (!user) return res.status(404).json({ "email": "This user does not exist" });

  if (bcrypt.compareSync(password, user.password)) {
    await setTokenCookie(res, { "id": user.id, "username": user.username });
    return res.json(user);
  };

  return res.sendStatus(400).json({ 'password': 'Incorrect Password' });
};
