"use strict";
// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import app from "./app";
// import express from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = process.env.PORT || 3000;
// export interface Request extends express.Request {
//   user: any
// }
// createConnection().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch(error => console.log(error));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const User_1 = require("./entities/User");
const Task_1 = require("./entities/Task");
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const port = 3000;
/**
 * Establishes a connection to the PostgreSQL database and starts the Express server.
 *
 * This script sets up the application by configuring the database connection, initializing the Express server,
 * and setting up the necessary middleware and routes. It also handles errors globally using the `errorMiddleware`.
 *
 * - Connects to the PostgreSQL database using TypeORM.
 * - Sets up middleware for parsing cookies and JSON request bodies.
 * - Defines routes for handling tasks and users.
 * - Attaches the global error handling middleware.
 * - Starts the server on the specified port.
 *
 * @returns {Promise<void>} A promise that resolves when the server has started and the connection to the database is established.
 *
 * @throws {Error} If there is an issue with the database connection or server startup.
 */
(0, typeorm_1.createConnection)({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User_1.User,
        Task_1.Task
    ],
    synchronize: true,
}).then(connection => {
    console.log('Connected to the database');
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.send('Welcome to server!');
    });
    app.use("/api/tasks", taskRoutes_1.default);
    app.use("/api/users", userRoutes_1.default);
    // Error handling middleware should be the last middleware
    app.use(errorMiddleware_1.errorMiddleware);
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => console.log('Database connection error:', error));
