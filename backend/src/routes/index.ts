import { Router } from "express";
import authRouter from "./auth.routes.js";
import projectsRouter from "./projects.routes.js"

const router = Router();
router.use("/auth", authRouter);
router.use("/projects", projectsRouter);


export default router
