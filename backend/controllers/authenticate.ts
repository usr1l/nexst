import express from 'express';
import { getUserByEmail, createUser } from '../models/User';
import bcrypt from 'bcryptjs';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.sendStatus(400);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return res.sendStatus(400);

    // new user info
    const userInfo: Record<string, any> = {
      email,
      username,
      password
    }

    // use bcrypt to generate a password
    bcrypt.genSalt(10, (err: Error | null, salt: string) => {
      bcrypt.hash(userInfo.password, salt, (err, hash) => {
        if (err) throw err;
        userInfo.password = hash;
      })
    })

    const newUser = await createUser(userInfo);
    return res.status(200).json(newUser).end();
  } catch (error: Error | unknown) {
    return res.sendStatus(400).json(error);
  };
};
