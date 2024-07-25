import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "../entities/Task";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

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
export const createTask = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { title, description, status, priority, dueDate } = req.body;

  const task = await taskRepository.create({ title, description, status, priority, dueDate, user: req.user });
  if(!task){
    throw new ApiError(500, "Getting error in tasks")
  }
  
  // const oldTtitle = await taskRepository.find({title});
  // if(oldTtitle.title === title){
  //   return res.status(409).send("A task of same title already exists please make another task");
  // }

  const isSaved = await taskRepository.save(task);
  if(!isSaved) throw new ApiError(500, "Something went wrong while saving task!")
  res.status(201).json(new ApiResponse(200, task, "Successfully created the task!"));
});


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

export const getTasks = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user } });
  if(tasks.length == 0){
    throw new ApiError(404, "Task is empty please make a task!")
    
  }
  res.status(200).json(new ApiResponse(200, tasks, "Successfully retrived the task!"));
});


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
export const updateTask = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { taskId } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  let task = await taskRepository.findOne({ where: { id: taskId, user: req.user } });
  if (!task) throw new ApiError(404, "Task not found");

  task.title = title;
  task.description = description;
  task.status = status;
  task.priority = priority;
  task.dueDate = dueDate;

  const isSaved = await taskRepository.save(task);
  if(!isSaved) throw new ApiError(500, "Something went wrong while saving the task!");
  res.status(200).json(new ApiResponse(200, task, `Task ${task.id} updated successfully!`));
});


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
export const deleteTask = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { taskId } = req.params;

  let task = await taskRepository.findOne({ where: { id: taskId, user: req.user } });
  if (!task) throw new ApiError(404, "Task not found") ;

  const isRemoved = await taskRepository.remove(task);
  if(!isRemoved) throw new ApiError(500, "Something went wrong while removing the task!")
  res.status(202).json(new ApiResponse(202, `Task ${taskId} has been deleted successfully!`));
});

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
export const sortPriority = asyncHandler( async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user }, order: { priority: 'ASC' } });
  if(!tasks) throw new ApiError(500, "Something went wrong while sorting the tasks on the basis of priority!")
    res.status(200).json(new ApiResponse(200, tasks, "Priority based sorting done!"));
});

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
export const sortStatus = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user }, order: { status: 'ASC' } });
  if(!tasks) throw new ApiError(500, "Something went wrong while sorting the tasks on the basis of status!")
  res.status(200).json(new ApiResponse(200, tasks, "Status based sorting done!"));

})


