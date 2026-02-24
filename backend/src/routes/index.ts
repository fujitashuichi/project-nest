import { Router } from "express";
import authRouter from "./auth.js";
import projectsRouter from "./projects.js"

const router = Router();
router.use("/auth", authRouter);
router.use("/projects", projectsRouter);


export default router
