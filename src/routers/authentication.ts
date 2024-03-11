import express, { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
} from "../controllers/authController";
import authenticated from "../middlewares/auth";

const authentication: Router = express.Router();

authentication.post("/login", login);
authentication.post("/register", register);
authentication.post("/forgot-password", forgotPassword);
authentication.post("/logout", authenticated, logout);

export default authentication;
