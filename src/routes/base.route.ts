import { Router } from "express";
import { return200, returnOk } from "../controller/base.controller";
const router = Router();

router.get("/", [returnOk]);

export default router;