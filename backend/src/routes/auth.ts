import { Router } from "express";
import { register } from "../middleware/authentication/register.js";

const router = Router();

router.post("/register", register);

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
