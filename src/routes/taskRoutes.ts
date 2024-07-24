import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
