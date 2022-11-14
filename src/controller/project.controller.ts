import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { Task } from "../models/tasks.model";


///creates a project
export async function createProject(req: Request, res: Response) {
    const { name, description, startDate, dueDate } = req.body;
    if (!name || !description || !startDate || !dueDate) {
        return res
            .status(400)
            .send({ message: "Please provide all required fields" });
    }

    const project = await Project.create({
        name,
        description,
        startDate,
        dueDate,
    });
    res.send(project);
}

// gets all project
export async function getAllProjects(req: Request, res: Response) {
    const projects = await Project.find({});
    res.send(projects);
}

//get single project 
export async function getProject(req: Request, res: Response) {
    if (!req.params.id) {
        res.send("misising id");
    }
    const project = await Project.findById(req.params.id).populate("tasks");
    res.send(project);
}

//update/edit a project
export async function updateProject(req: Request, res: Response) {
    const updateOptions: any = {};
    if (req.body.name) {
        updateOptions.name = req.body.name;
    }
    if (req.body.description) {
        updateOptions.description = req.body.description;
    }
    if (req.body.startDate) {
        updateOptions.startDate = req.body.startDate;
    }
    if (req.body.dueDate) {
        updateOptions.dueDate = req.body.dueDate;
    }
    if (req.body.completedDate) {
        updateOptions.completedDate = req.body.completedDate;
    }
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        updateOptions,
        {
            new: true,
        }
    );
    res.send(project);
}

// delete a project
export async function deleteProject(req: Request, res: Response) {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).send({ message: "Project not found" });
    }
    await project.remove();
    return res.sendStatus(204);
}

//asssign a task to a project
export async function assignTaskToProject(req: Request, res: Response) {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).send({ message: "Project not found" });
    }
    if (!req.body.taskId) {
        res.send("endter taskid ");
    }
    const task = await Task.findById(req.body.taskId);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }

    project.tasks.push(task._id);
    await project.save();
    task.project = project._id;
    await res.send(project);
}
//remove a task to a project
export async function removeTaskFromProject(req: Request, res: Response) {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).send({ message: "Project not found" });
    }
    if (!req.body.taskId) {
        res.send("endter taskid ");
    }
    const task = await Task.findById(req.body.taskId);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }

    project.tasks = project.tasks.filter(
        (projectTask) => (projectTask._id as string) === (task._id as string)
    );
    await project.save();
    res.send(project);
}

//get filtered projects
export async function getFilteredProjects(req: Request, res: Response) {
    const { name, description, startDate, dueDate } = req.body;
    const projects = await Project.find({
        $and: [
            {
                name: {
                    $regex: name,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: description,
                    $options: "i",
                },
            },
        ],
    });
    res.send(projects);
}

// get a sorted projects 
export async function getSortedProjects(req: Request, res: Response) {
    const { sortBy, sortOrder } = req.body;
    const projects = await Project.find({})
        .sort({ [sortBy]: sortOrder })
        .populate("tasks");
    res.send(projects);
}