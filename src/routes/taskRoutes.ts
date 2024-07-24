import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask, sortPriority, sortStatus } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: any = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/sortPriority", authMiddleware, sortPriority);
router.get("/sortStatus", authMiddleware, sortStatus);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
