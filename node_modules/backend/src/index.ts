import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createAppRouter } from "./routes/index.js";
import { globalErrorHandler } from "./middleware/index.js";
import { ENV } from "./config/env.js";
import { createAppDb } from "./db/app.db.js";

const FE_URL = ENV.NODE_FE_URL;

const app = express();

app.use(cors({
  origin: FE_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const db = await createAppDb("app.db");

app.use("/api", createAppRouter(db));
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});