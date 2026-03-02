import { Router } from "express";

const router = Router();

router.post("/", (_, res) => {
  res.status(501).send();
});

router.get("/", (_, res) => {
  res.status(501).send();
});

router.patch("/:id", (_, res) => {
  res.status(501).send();
});

router.delete("/:id", (_, res) => {
  res.status(501).send();
});


export default router
