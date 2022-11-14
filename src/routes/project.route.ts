

import Router from "express-promise-router";
import {
    assignTaskToProject,
    createProject,
    deleteProject,
    getAllProjects,
    getFilteredProjects,
    getProject,
    getSortedProjects,
    removeTaskFromProject,
    updateProject,
} from "../controller/project.controller";

const router = Router();
//routers with different project functionalities
router.get("/", [getAllProjects]);
router.get("/:id", [getProject]);
router.post("/", [createProject]);
router.put("/:id", [updateProject]);
router.delete("/:id", [deleteProject]);
router.post("/:id/assign", [assignTaskToProject]);
router.post("/:id/unassign", [removeTaskFromProject]);
router.post("/sort", [getSortedProjects]);
router.post("/filter", [getFilteredProjects]);

export default router;