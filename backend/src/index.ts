import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/test", (_, res) => {
  res.status(200).json({
    id: "00000001",
    email: "example@gmail.com"
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});