"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const app = (0, express_1.default)();
// app.use(express.json());
// app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);
exports.default = app;
