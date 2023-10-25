import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import mongoose from "mongoose";
import { mongoURI, key } from "./index";
import { PassportStatic } from "passport";
import { PassportCountryCode } from "express-validator/src/options";

// options for the jwt passport
const options: StrategyOptions = {
  'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
  'secretOrKey': key
};

const passportAuth = (passport: PassportStatic) => {
  passport.use(new Strategy(options, (jwt_payload: { 'id': string, 'username': string }, done: VerifiedCallback) => {
    console.log(jwt_payload)
  }));
};

export default passportAuth;
