import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import "reflect-metadata"



const app = express();

// app.use(express.json());

// app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);

export default app;
