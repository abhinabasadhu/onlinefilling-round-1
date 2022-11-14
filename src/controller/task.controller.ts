import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { Task } from "../models/tasks.model";
import { checkIfProjectIsCompleted } from "../utils/project";

// Get all tasks
export async function getAllTasks(req: Request, res: Response) {
    const tasks = await Task.find({});
    res.send(tasks);
}

// Get filtered tasks
export async function getFilteredTasks(req: Request, res: Response) {
    const tasks = await Task.find({
        name: { $regex: req.params.name, $options: "i" },
    });
    res.send(tasks);
}

// Get sorted tasks
export async function getSortedTasks(req: Request, res: Response) {
    const { sortType, sortOrder } = req.body;
    const tasks = await Task.find({}).sort({ [sortType]: sortOrder });
    res.send(tasks);
}

// Create task
export async function createTask(req: Request, res: Response) {
    const { name, description } = req.body;

    const startDate = new Date(req.body.startDate);
    const dueDate = new Date(req.body.dueDate);

    if (!name || !description || !startDate || !dueDate) {
        return res.status(400).send({
            message: "Please provide all required fields",
        });
    }
    const task = Task.create({
        name,
        description,
        startDate,
        dueDate,
    });
    res.send("Task Has Been Created ");
}

// Set task as done
export async function setTaskAsDone(req: Request, res: Response) {
    if (!req.params.id) {
        return res.send("id missiing ");
    }
    const task: any = await Task.findById(req.params.id);
    task.done = true;
    task.completedDate = new Date();
    await task.save();

    if (task.project) {
        const project: any = await Project.findById(task.project);
        if (await checkIfProjectIsCompleted(project)) {
            project.completedDate = new Date();
            await project.save();
        }
    }
    res.send(task);
}

// Set task as todo
export async function setTaskAsTodo(req: Request, res: Response) {
    const task: any = await Task.findById(req.params.id);
    task.done = false;
    task.completedDate = undefined;
    await task.save();

    // Does not remove completedDate from project if task is set as todo
    res.send(task);
}

// Update task
export async function updateTask(req: Request, res: Response) {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }

    if (req.body.name) {
        task.name = req.body.name;
    }
    if (req.body.description) {
        task.description = req.body.description;
    }
    if (req.body.startDate) {
        task.startDate = req.body.startDate;
    }
    if (req.body.dueDate) {
        task.dueDate = req.body.dueDate;
    }
    await task.save();
    res.send(task);
}

// Delete task
export async function deleteTask(req: Request, res: Response) {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    await task.remove();
    res.send(task);
}

// Get task
export async function getTask(req: Request, res: Response) {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    res.send(task);
}