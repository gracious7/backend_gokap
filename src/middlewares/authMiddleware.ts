import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(decoded.userId);

    if (!user) return res.status(401).send("Access denied");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};