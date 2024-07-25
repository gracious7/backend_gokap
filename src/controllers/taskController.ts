import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "../entities/Task";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

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

export const getTasks = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user } });
  if(tasks.length == 0){
    throw new ApiError(404, "Task is empty please make a task!")
    
  }
  res.status(200).json(new ApiResponse(200, tasks, "Successfully retrived the task!"));
});

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

export const deleteTask = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { taskId } = req.params;

  let task = await taskRepository.findOne({ where: { id: taskId, user: req.user } });
  if (!task) throw new ApiError(404, "Task not found") ;

  const isRemoved = await taskRepository.remove(task);
  if(!isRemoved) throw new ApiError(500, "Something went wrong while removing the task!")
  res.status(202).json(new ApiResponse(202, `Task ${taskId} has been deleted successfully!`));
});

export const sortPriority = asyncHandler( async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user }, order: { priority: 'ASC' } });
  if(!tasks) throw new ApiError(500, "Something went wrong while sorting the tasks on the basis of priority!")
    res.status(200).json(new ApiResponse(200, tasks, "Priority based sorting done!"));
});
export const sortStatus = asyncHandler(async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user }, order: { status: 'ASC' } });
  if(!tasks) throw new ApiError(500, "Something went wrong while sorting the tasks on the basis of status!")
  res.status(200).json(new ApiResponse(200, tasks, "Status based sorting done!"));

})


