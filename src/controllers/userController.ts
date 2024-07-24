import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ username, password: hashedPassword });

  await userRepository.save(user);
  res.status(201).send(user);
};

export const login = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { username, password } = req.body;

  const user = await userRepository.findOne({ username });
  if (!user) return res.status(404).send("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  res.send({ token });
  
};
