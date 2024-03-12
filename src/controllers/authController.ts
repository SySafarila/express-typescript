import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ValidationError } from "joi";
import { v4 as uuidv4 } from "uuid";
import generateJwt from "../utils/jwt";
import prisma from "../utils/prisma";
import loginValidator from "../validations/login";
import registerValidator from "../validations/register";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const checkValidationError: ValidationError = loginValidator(req.body);

  if (checkValidationError) {
    res.status(400).json({ message: checkValidationError.details[0].message });
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

  try {
    await prisma.$transaction([
      prisma.accessToken.create({
        data: {
          id: uuidv4(),
          token: token,
          user_id: user.id,
          refresh_token: {
            create: {
              id: uuidv4(),
              user_id: user.id,
            },
          },
        },
      }),
    ]);
  } catch (error) {
    res.status(500).json({
      message:
        "Internal server error when storing access token and refresh token to database",
    });
    return;
  }

  res.status(200).json({
    message: "Authenticated",
    token: token,
    refresh_token: refreshToken,
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const checkValidationError: ValidationError = registerValidator(req.body);

  if (checkValidationError) {
    res.status(400).json({ message: checkValidationError.details[0].message });
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
  try {
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: bcrypt.hashSync(password, 10),
        id: uuidv4(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }

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
