import express, { Request, Response } from 'express';
import { getUserByEmail, createUser, UserDocument } from '../models/User';
import bcrypt from 'bcryptjs';

export const register = async function (req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.sendStatus(400);

    const existingUser: UserDocument | null = await getUserByEmail(email);

    if (existingUser) return res.sendStatus(400);

    // new user info
    const userInfo: Record<string, any> = {
      email,
      username,
      password
    }

    const newUser = await createUser(userInfo);
    return res.status(200).json(newUser).end();
  } catch (error: Error | unknown) {
    return res.sendStatus(400).json(error);
  };
};

export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ "error": "Missing login credentials" })

  const user: UserDocument | null = await getUserByEmail(email);
  if (!user) return res.status(404).json({ "email": "This user does not exist" });

  if (bcrypt.compareSync(password, user.password)) {

    return res.json(user);
  };

  return res.status(400).json({ 'password': 'Incorrect Password' });
};
