"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
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
exports.authMiddleware = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token)
        throw new ApiError_1.ApiError(401, "Access denied!");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(process.env.JWT_SECRET);
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(decoded.userId);
        if (!user)
            throw new ApiError_1.ApiError(401, "Access denied!");
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).json(new ApiError_1.ApiError(400, "Invalid token"));
    }
}));
