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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortStatus = exports.sortPriority = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("../entities/Task");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const { title, description, status, priority, dueDate } = req.body;
    const task = yield taskRepository.create({ title, description, status, priority, dueDate, user: req.user });
    // const oldTtitle = await taskRepository.find({title});
    // if(oldTtitle.title === title){
    //   return res.status(409).send("A task of same title already exists please make another task");
    // }
    yield taskRepository.save(task);
    res.status(201).send(task);
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const tasks = yield taskRepository.find({ where: { user: req.user } });
    if (!tasks) {
        return res.status(204).send("Account deleted successfully!");
    }
    res.send(tasks);
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    let task = yield taskRepository.findOne({ where: { id: taskId, user: req.user } });
    if (!task)
        return res.status(404).send("Task not found");
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;
    yield taskRepository.save(task);
    res.send(task);
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const { taskId } = req.params;
    let task = yield taskRepository.findOne({ where: { id: taskId, user: req.user } });
    if (!task)
        return res.status(404).send("Task not found");
    yield taskRepository.remove(task);
    res.status(204).send();
});
exports.deleteTask = deleteTask;
const sortPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const tasks = yield taskRepository.find({ where: { user: req.user }, order: { priority: 'ASC' } });
    res.send(tasks);
});
exports.sortPriority = sortPriority;
const sortStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const tasks = yield taskRepository.find({ where: { user: req.user }, order: { status: 'ASC' } });
    res.send(tasks);
});
exports.sortStatus = sortStatus;
