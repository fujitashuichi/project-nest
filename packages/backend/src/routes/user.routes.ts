import { Router } from "express";
import { Database } from "sqlite3";
import { requestValidator } from "../middleware/index.js";
import { getProjects } from "../controller/index.js";


export const createUserRouter = (db: Database) => {
  const router = Router();

  router.get("/:userId/projects",
    requestValidator("getProjects"),
    getProjects(db)
  );

  return router;
}