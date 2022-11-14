import { Document, model, Schema } from "mongoose";

export interface ITask extends Document {
    name: string;
    description: string;
    done: boolean;
    startDate: Date;
    dueDate: Date;
    completedDate?: Date;
    project: Schema.Types.ObjectId;
}

const taskSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        done: { type: Boolean, required: true, default: false },
        startDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        completedDate: { type: Date, required: false },
        project: { type: Schema.Types.ObjectId, ref: "Project" },
    },
    { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);