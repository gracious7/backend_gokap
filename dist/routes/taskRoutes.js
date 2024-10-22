"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authMiddleware, taskController_1.createTask);
router.get("/", authMiddleware_1.authMiddleware, taskController_1.getTasks);
router.get("/sortPriority", authMiddleware_1.authMiddleware, taskController_1.sortPriority);
router.get("/sortStatus", authMiddleware_1.authMiddleware, taskController_1.sortStatus);
router.put("/:taskId", authMiddleware_1.authMiddleware, taskController_1.updateTask);
router.delete("/:taskId", authMiddleware_1.authMiddleware, taskController_1.deleteTask);
exports.default = router;
