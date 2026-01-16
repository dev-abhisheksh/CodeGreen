import express from "express";
import { createDrive, getDriveById, getDrives, joinDrive, leaveDrive } from "../controllers/drive.controller.js";
import verifyToken from "../middlewares/authToken.middleware.js";


const router = express.Router();

router.post("/", verifyToken, createDrive);

router.get("/", getDrives);
router.get("/:id", getDriveById);

router.patch("/:id/join", verifyToken, joinDrive);
router.patch("/:id/leave", verifyToken, leaveDrive);

export default router;
