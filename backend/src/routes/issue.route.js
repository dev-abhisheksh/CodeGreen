import express from "express";
import { createIssue, getIssueById, getIssues, updateStatus } from "../controllers/issue.controller.js";
import verifyToken from "../middlewares/authToken.middleware.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

// Create with image upload
router.post("/", verifyToken, upload.single("image"), createIssue);

// Public: get all
router.get("/", getIssues);

// Public: get one
router.get("/:id", getIssueById);

// Creator-only: update status
router.patch("/:id/status", verifyToken, updateStatus);

export default router;
