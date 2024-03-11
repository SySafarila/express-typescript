import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { appName, jwtSecret } from "../env";

interface JwtArg {
  hours: number;
  user_id: string;
}

const generateJwt = (args: JwtArg): string => {
  const payload: JwtPayload = {
    user_id: args.user_id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * args.hours,
  };
  const options: SignOptions = {
    algorithm: "HS256",
    issuer: appName,
  };
  const token: string = jwt.sign(payload, jwtSecret, options);
  return token;
};

export default generateJwt;
