import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});