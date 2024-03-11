import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import generateJwt from "../utils/jwt";
import prisma from "../utils/prisma";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check input
  if (!email || !password) {
    res.status(400).json({ message: "Email or Password are required!" });
    return;
  }

  // check user exist
  let users: User[];

  try {
    users = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  if (users.length < 1) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  // check password hash
  const user: User = users[0];
  const comparePassword: boolean = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    res.status(401).json({ message: "Credentials not match" });
    return;
  }

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

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "Email, password, and name are required" });
    return;
  }

  // check if user already exist
  let users: User[];
  try {
    users = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  if (users.length > 0) {
    res.status(400).json({ message: "User already registered" });
    return;
  }

  // registering retrieved user
  await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: bcrypt.hashSync(password, 10),
      id: uuidv4(),
    },
  });

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
