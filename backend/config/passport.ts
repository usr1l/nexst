import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { key } from "./index";
import { PassportStatic } from "passport";
import { getUserById, UserDocument } from "../models/User";
import { CustomJWT } from "interfaces";

// options for the jwt passport
const options: StrategyOptions = {
  'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
  'secretOrKey': key
};

// passport uses options that include the key and the jwt, and the callback specifies what to do with the decoded jwt
const passportAuth = (passport: PassportStatic) => {
  passport.use(new Strategy(options, (jwt_payload: CustomJWT, done: VerifiedCallback) => {
    try {
      const user: UserDocument | unknown = getUserById(jwt_payload.id).lean();
      if (user) {
        console.log("USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR", user)
        return done(null, user)
      } else return done(null, false);
    } catch (err: any) {
      return err.json();
    };
  }));
};

export default passportAuth
