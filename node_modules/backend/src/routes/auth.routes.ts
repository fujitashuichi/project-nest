import { Router } from "express";
import { Database } from "sqlite3";
import { session, login, logout, register } from "../controller/index.js";
import { requestValidator } from "../middleware/index.js";


export const createAuthRouter = (db: Database) => {
  const router = Router();

  router.post("/register",
    requestValidator("register"),
    register(db)
  );

  router.get("/session",
    session(db)
  );

  router.post("/login",
    requestValidator("login"),
    login(db)
  );

  router.post("/logout",
    logout
  );

  router.post("/me", (req, res) => {
    res.status(501).json();
  });

  return router;
}
