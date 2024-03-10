import { Request, Response } from "express";
import generateJwt from "../utils/jwt";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check credentials
  if (!email || !password) {
    res.status(400).json({ message: "Email or Password are required!" });
    return;
  }

  // create token and refresh token
  const token: string = generateJwt(3, 1);

  res.status(200).json({ message: "Authenticated", token: token });
};

export const register = (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // check if user already exist

  // send email verification

  res.status(200).json({ message: "Register success" });
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;

  // check if email already registered

  // send email for recover password

  res.status(200).json({ message: "Email sent" });
};

export const logout = (req: Request, res: Response) => {
  // check if token valid

  // delete/revoke token

  res.status(200).json({ message: "Logout success" });
};
