import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import authRouter from "./routes/auth.route.js"
import issueRouter from "./routes/issue.route.js"
import driveRouter from "./routes/drive.route.js"
import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/auth", authRouter)
app.use("/issues", issueRouter)
app.use("/drives", driveRouter)
app.use("/users", userRouter)

export default app;