import { Schema, model, Document } from "mongoose";
import { ITask } from "./tasks.model";

export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    completedDate?: Date;
    tasks: ITask[];
}

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    completedDate: { type: Date, required: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], // single project can have many tasks 
});

export const Project = model<IProject>("Project", projectSchema);