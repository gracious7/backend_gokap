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
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
/**
 * Creates a new task.
 *
 * @param req - The request object containing the task details in the body and user information.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the created task.
 *
 * @throws {ApiError} If there is an error creating or saving the task.
 */
exports.createTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const { title, description, status, priority, dueDate } = req.body;
    const task = yield taskRepository.create({ title, description, status, priority, dueDate, user: req.user });
    if (!task) {
        throw new ApiError_1.ApiError(500, "Getting error in tasks");
    }
    // const oldTtitle = await taskRepository.find({title});
    // if(oldTtitle.title === title){
    //   return res.status(409).send("A task of same title already exists please make another task");
    // }
    const isSaved = yield taskRepository.save(task);
    if (!isSaved)
        throw new ApiError_1.ApiError(500, "Something went wrong while saving task!");
    res.status(201).json(new ApiResponse_1.ApiResponse(200, task, "Successfully created the task!"));
}));
/**
 * Retrieves all tasks for the authenticated user.
 *
 * @param req - The request object containing the user information.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the list of tasks.
 *
 * @throws {ApiError} If no tasks are found for the user.
 */
exports.getTasks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const tasks = yield taskRepository.find({ where: { user: req.user } });
    if (tasks.length == 0) {
        throw new ApiError_1.ApiError(404, "Task is empty please make a task!");
    }
    res.status(200).json(new ApiResponse_1.ApiResponse(200, tasks, "Successfully retrived the task!"));
}));
/**
 * Updates an existing task.
 *
 * @param req - The request object containing the task ID in the parameters and updated task details in the body.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the updated task.
 *
 * @throws {ApiError} If the task is not found or if there is an error updating the task.
 */
exports.updateTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    let task = yield taskRepository.findOne({ where: { id: taskId, user: req.user } });
    if (!task)
        throw new ApiError_1.ApiError(404, "Task not found");
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;
    const isSaved = yield taskRepository.save(task);
    if (!isSaved)
        throw new ApiError_1.ApiError(500, "Something went wrong while saving the task!");
    res.status(200).json(new ApiResponse_1.ApiResponse(200, task, `Task ${task.id} updated successfully!`));
}));
/**
 * Deletes a task.
 *
 * @param req - The request object containing the task ID in the parameters.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response confirming the task deletion.
 *
 * @throws {ApiError} If the task is not found or if there is an error removing the task.
 */
exports.deleteTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const { taskId } = req.params;
    let task = yield taskRepository.findOne({ where: { id: taskId, user: req.user } });
    if (!task)
        throw new ApiError_1.ApiError(404, "Task not found");
    const isRemoved = yield taskRepository.remove(task);
    if (!isRemoved)
        throw new ApiError_1.ApiError(500, "Something went wrong while removing the task!");
    res.status(202).json(new ApiResponse_1.ApiResponse(202, `Task ${taskId} has been deleted successfully!`));
}));
/**
 * Retrieves tasks sorted by priority.
 *
 * @param req - The request object containing the user information.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the list of tasks sorted by priority.
 *
 * @throws {ApiError} If there is an error while sorting tasks by priority.
 */
exports.sortPriority = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const tasks = yield taskRepository.find({ where: { user: req.user }, order: { priority: 'ASC' } });
    if (!tasks)
        throw new ApiError_1.ApiError(500, "Something went wrong while sorting the tasks on the basis of priority!");
    res.status(200).json(new ApiResponse_1.ApiResponse(200, tasks, "Priority based sorting done!"));
}));
/**
 * Retrieves tasks sorted by status.
 *
 * @param req - The request object containing the user information.
 * @param res - The response object used to send the response back to the client.
 *
 * @returns A JSON response containing the list of tasks sorted by status.
 *
 * @throws {ApiError} If there is an error while sorting tasks by status.
 */
exports.sortStatus = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = (0, typeorm_1.getRepository)(Task_1.Task);
    const tasks = yield taskRepository.find({ where: { user: req.user }, order: { status: 'ASC' } });
    if (!tasks)
        throw new ApiError_1.ApiError(500, "Something went wrong while sorting the tasks on the basis of status!");
    res.status(200).json(new ApiResponse_1.ApiResponse(200, tasks, "Status based sorting done!"));
}));
