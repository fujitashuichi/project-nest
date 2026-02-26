import { Router } from "express";
import { registerValidation } from "../middleware/index.js";
import { register } from "../controller/index.js";

const router = Router();

router.post("/register",
  registerValidation,
  register
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
