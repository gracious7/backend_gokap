import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "../entities/Task";

export const createTask = async (req: Request, res: Response) => {
  const taskRepository = getRepository(Task);
  const { title, description, status, priority, dueDate } = req.body;

  const task = taskRepository.create({ title, description, status, priority, dueDate, user: req.user });

  await taskRepository.save(task);
  res.status(201).send(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { user: req.user } });
  res.send(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
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

export const deleteTask = async (req: Request, res: Response) => {
  const taskRepository = getRepository(Task);
  const { taskId } = req.params;

  let task = await taskRepository.findOne({ where: { id: taskId, user: req.user } });
  if (!task) return res.status(404).send("Task not found");

  await taskRepository.remove(task);
  res.status(204).send();
};
