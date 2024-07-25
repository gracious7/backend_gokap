import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

/**
 * Middleware to authorize user based on JWT token.
 * 
 * This middleware checks for the presence of a JWT token in cookies, verifies it, and retrieves the user associated with the token.
 * If the token is valid and the user exists, the user is attached to the request object and the request is allowed to proceed.
 * Otherwise, an error response is sent.
 * 
 * @param req - The request object, which is expected to contain a JWT token in cookies.
 * @param res - The response object used to send the response back to the client.
 * @param next - The next middleware function to call if authorization is successful.
 * 
 * @returns Calls the next middleware function if authorization is successful.
 * 
 * @throws {ApiError} If no token is provided, if the token is invalid, or if the user is not found.
 */
export const authMiddleware = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Access denied!");

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(process.env.JWT_SECRET);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(decoded.userId);

    if (!user) throw new ApiError(401, "Access denied!");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json(new ApiError(400, "Invalid token"));
  }
});
