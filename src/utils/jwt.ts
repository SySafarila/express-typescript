import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { appName, jwtSecret } from "../env";

const generateJwt = (hours: number, user_id: number | string): string => {
  const payload: JwtPayload = {
    user_id: user_id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * hours, // 3h
  };
  const options: SignOptions = {
    algorithm: "HS256",
    issuer: appName,
  };
  const token: string = jwt.sign(payload, jwtSecret, options);
  return token;
};

export default generateJwt;
