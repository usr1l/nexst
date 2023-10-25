import jwt, { JwtPayload } from 'jsonwebtoken';
import { key, environment, port, mongoURI, expiresIn } from '../config/';
import { Response, Request } from 'express';
import { UserDocument } from 'models/User';
import { CustomJWT } from 'interfaces';

// Sends a JWT Cookie
export const setTokenCookie = (res: Response, payload: CustomJWT) => {
  // Create the token.

  const token: string = jwt.sign(
    payload,
    key,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );
  const isProduction: boolean = environment === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: parseInt(expiresIn) * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "lax"
  });

  return token;
};

// const restoreUser = (req, res, next) => {
//   // token parsed from cookies
//   const { token } = req.cookies;
//   req.user = null;

//   return jwt.verify(token, secret, null, async (err, jwtPayload) => {
//     if (err) {
//       return next();
//     }

//     try {
//       const { id } = jwtPayload.data;
//       req.user = await User.scope('currentUser').findByPk(id);
//     } catch (e) {
//       res.clearCookie('token');
//       return next();
//     }

//     if (!req.user) res.clearCookie('token');

//     return next();
//   });
// };

// // If there is no current user, return an error
// const requireAuth = function (req, _res, next) {
//   if (req.user) return next();

//   const err = new Error('Authentication required');
//   err.title = 'Authentication required';
//   err.errors = [ 'Authentication required' ];
//   err.status = 401;
//   return next(err);
// };
