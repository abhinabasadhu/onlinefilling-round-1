import taskHandler from "./task.route";
import projectHandler from "./project.route";
import Router from "express-promise-router";

const router = Router();

router.use("/task", taskHandler);
router.use("/project", projectHandler);

export default router;