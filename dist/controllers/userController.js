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
exports.login = exports.register = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
/**
 * Registers a new user.
 *
 * @param req - The request object containing the user registration details in the body.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the registered user.
 *
 * @throws {ApiError} If something goes wrong during registration or if the user already exists.
 */
exports.register = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const { username, password } = req.body;
    const notValid = userRepository.find({ username });
    if (!(!notValid)) {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = userRepository.create({ username, password: hashedPassword });
        if (!user)
            throw new ApiError_1.ApiError(500, "Something went wront while registration!");
        const isSaved = yield userRepository.save(user);
        if (!isSaved)
            throw new ApiError_1.ApiError(500, "Unable to save user please try again!");
        res.status(201).json(new ApiResponse_1.ApiResponse(201, user, "Registered Successfully!"));
    }
    else {
        throw new ApiError_1.ApiError(409, "User already exists");
    }
}));
/**
 * Authenticates a user and generates a JWT token.
 *
 * @param req - The request object containing the user login details (username and password) in the body.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the authenticated user and a JWT token.
 *
 * @throws {ApiError} If the user is not found or if the credentials are invalid.
 */
exports.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const { username, password } = req.body;
    const user = yield userRepository.findOne({ username });
    if (!user)
        throw new ApiError_1.ApiError(404, "User not found");
    const isValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isValid)
        throw new ApiError_1.ApiError(401, "Invalid credentials!");
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).setHeader('Authorization', `Bearer ${token}`).cookie('token', token).json(new ApiResponse_1.ApiResponse(200, user, "Login Successfully"));
}));
