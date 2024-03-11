import { Request, Response } from "express";
import generateJwt from "../utils/jwt";
import { getUsers } from "../models/user";
import { User } from "@prisma/client";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check input
  if (!email || !password) {
    res.status(400).json({ message: "Email or Password are required!" });
    return;
  }

  // check user exist
  const users: User[] = await getUsers({
    where: {
      email: email,
    },
  });
  if (users.length < 1) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  // check password hash

  // create token and refresh token
  const token: string = generateJwt({ hours: 3, user_id: users[0].id }); // 3 hours
  const refreshToken: string = generateJwt({
    hours: 672,
    user_id: users[0]?.id,
  }); // 28 days

  res.status(200).json({
    message: "Authenticated",
    token: token,
    refresh_token: refreshToken,
  });
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
