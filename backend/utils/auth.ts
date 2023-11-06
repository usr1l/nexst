import jwt from 'jsonwebtoken';
import { key, expiresIn } from '../config';
import { Response } from 'express';
import { CustomJWT } from 'interfaces';

// Sends a JWT Cookie
export const setToken = async (payload: CustomJWT): Promise<string> => {
  // Create the token.
  const token = jwt.sign(
    payload,
    key,
    { expiresIn: parseInt(expiresIn) }
  );

  return 'Bearer ' + token;
};
