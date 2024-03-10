import { NextFunction, Request, Response } from "express";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }
  next();
};

export default authenticated;
