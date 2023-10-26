import jwt from 'jsonwebtoken';
import { key, environment, port, mongoURI, expiresIn } from '../config';
import { Response, Request } from 'express';
import { CustomJWT } from 'interfaces';

// Sends a JWT Cookie
export const setToken = async (res: Response, payload: CustomJWT): Promise<void> => {
  // Create the token.
  jwt.sign(
    payload,
    key,
    { expiresIn: parseInt(expiresIn) },
    // (err, token) => {
    // res.json({
    //   success: true,
    //   token: 'Bearer ' + token
    // })
    // console.log('Bearer ' + token)
    // }
  );

  return;
};
