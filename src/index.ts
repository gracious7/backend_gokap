// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import app from "./app";
// import express from "express";

// const PORT = process.env.PORT || 3000;

// export interface Request extends express.Request {
//   user: any
// }

// createConnection().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch(error => console.log(error));

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { User } from './entities/User';
import { Task } from './entities/Task';
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config(); 
const app = express();
app.use(cookieParser());
const port = 3000;

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Task
  ],
  synchronize: true,
}).then(connection => {
  console.log('Connected to the database');

  app.get('/', (req, res) => {
    res.send('Welcome to server!');
  });

  app.use(express.json());
  app.use(errorMiddleware);

  app.use("/api/tasks", taskRoutes);
  app.use("/api/users", userRoutes);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => console.log('Database connection error:', error));
