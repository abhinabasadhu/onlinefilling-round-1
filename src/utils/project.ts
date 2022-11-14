import { IProject } from "../models/project.model";
import { Task } from "../models/tasks.model";

export async function checkIfProjectIsCompleted(project: IProject) {
    const tasks = await Task.find({ project: project._id });
    const completedTasks = tasks.filter((task) => task.done);
    return completedTasks.length === tasks.length;
}