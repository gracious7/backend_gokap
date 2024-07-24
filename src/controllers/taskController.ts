import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "../entities/Task";

export const createTask = async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { title, description, status, priority, dueDate } = req.body;

  const task = await taskRepository.create({ title, description, status, priority, dueDate, user: req.user });

  // const oldTtitle = await taskRepository.find({title});
  // if(oldTtitle.title === title){
  //   return res.status(409).send("A task of same title already exists please make another task");
  // }

  await taskRepository.save(task);
  res.status(201).send(task);
};

export const getTasks = async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user } });
  if(!tasks){
    return res.status(204).send("Account deleted successfully!");
  }
  res.send(tasks);
};

export const updateTask = async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { taskId } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  let task = await taskRepository.findOne({ where: { id: taskId, user: req.user } });
  if (!task) return res.status(404).send("Task not found");

  task.title = title;
  task.description = description;
  task.status = status;
  task.priority = priority;
  task.dueDate = dueDate;

  await taskRepository.save(task);
  res.send(task);
};

export const deleteTask = async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const { taskId } = req.params;

  let task = await taskRepository.findOne({ where: { id: taskId, user: req.user } });
  if (!task) return res.status(404).send("Task not found");

  await taskRepository.remove(task);
  res.status(204).send();
};
export const sortPriority = async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user }, order: { priority: 'ASC' } });
  res.send(tasks);
};
export const sortStatus = async (req: any, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user }, order: { status: 'ASC' } });
  res.send(tasks);
};


