import { Router } from "express";
import { registerValidation } from "../middleware/auth.guard.js";

const router = Router();

router.post("/register",
  registerValidation
);

router.post("/login", (req, res) => {
  res.status(501).send();
});

router.post("/logout", (req, res) => {
  res.status(501).send();
});

router.post("/me", (req, res) => {
  res.status(501).send();
});


export default router
