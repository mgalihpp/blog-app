import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cookieParser from "cookie-parser";
import compression from "compression";

const PORT = process.env.PORT;
const URL = process.env.MONGOOSE_URL;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(compression())

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.get("/", async (req, res) => {
  res.send("ok");
});

try {
  mongoose.connect(URL);
  console.log("connected to mongodb");
} catch (error) {
  console.error(error);
}

app.listen(PORT, () => {
  console.log(PORT, "listening...");
});
