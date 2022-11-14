import Router from "express-promise-router";
import {
    getAllTasks,
    getFilteredTasks,
    getSortedTasks,
    createTask,
    deleteTask,
    getTask,
    setTaskAsDone,
    setTaskAsTodo,
    updateTask,
} from "../controller/task.controller";

const router = Router();

//router with diffrent task fucntionalities
router.get("/", [getAllTasks]);
router.get("/:name", [getFilteredTasks]);
router.post("/sort", [getSortedTasks]);
router.post("/", [createTask]);
router.put("/:id/done", [setTaskAsDone]);
router.put("/:id/todo", [setTaskAsTodo]);
router.delete("/:id", [deleteTask]);
router.get("/:id", [getTask]);
router.post("/:id", [updateTask]);

export default router;