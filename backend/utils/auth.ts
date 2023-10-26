import jwt from 'jsonwebtoken';
import { key, environment, port, mongoURI, expiresIn } from '../config/';
import { Response, Request } from 'express';
import { CustomJWT } from 'interfaces';

// Sends a JWT Cookie
export const setToken = async (res: Response, payload: CustomJWT): Promise<void> => {
  // Create the token.

  jwt.sign(
    payload,
    key,
    { expiresIn: parseInt(expiresIn) },
    (err, token) => {
      res.json({
        success: true,
        token: 'Bearer' + token
      })
    }
  );
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
