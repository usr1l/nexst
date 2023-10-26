import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import mongoose from "mongoose";
import { mongoURI, key } from "./index";
import { PassportStatic } from "passport";
import { getUserById, User, UserDocument } from "../models/User";
import { CustomJWT } from "interfaces";


// options for the jwt passport
const options: StrategyOptions = {
  'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
  'secretOrKey': key
};

// passport uses options that include the key and the jwt, and the callback specifies what to do with the decoded jwt
const passportAuth = (passport: PassportStatic) => {
  passport.use(new Strategy(options, (jwt_payload: CustomJWT, done: VerifiedCallback) => {
    console.log('jwt_payload', jwt_payload)
    try {
      const user: UserDocument | unknown = getUserById(jwt_payload.id);
      if (user) {
        return done(null, user)
      } else return done(null, false);
    } catch (err: any) {
      return console.log(err);
    };
  }));
};

export default passportAuth;
