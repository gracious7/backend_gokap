import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const register = asyncHandler(async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  
  const { username, password } = req.body;

  const notValid = userRepository.find({username});
  if(!(!notValid)){
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ username, password: hashedPassword });
    if(!user) throw new ApiError(500, "Something went wront while registration!");
  
    const isSaved = await userRepository.save(user);
    if(!isSaved) throw new ApiError(500, "Unable to save user please try again!");
    res.status(201).json(new ApiResponse(201, user, "Registered Successfully!"));
  }
  else{
    throw new ApiError(409, "User already exists");
  }

});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { username, password } = req.body;

  const user = await userRepository.findOne({ username });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new ApiError(401, "Invalid credentials!");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  res.status(200).setHeader('Authorization', `Bearer ${token}`).cookie('token', token).json(new ApiResponse(200, user, "Login Successfully"));
});
