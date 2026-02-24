import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

const FE_URL = import.meta.env.NODE_FE_URL;

const app = express();

app.use(cors({
  origin: FE_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});