import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
};

export const getTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const tasks = await Task.find().skip((page - 1) * limit).limit(limit);
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
