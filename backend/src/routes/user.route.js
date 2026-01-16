import express from "express";
import verifyToken from "../middlewares/authToken.middleware.js";
import { getMe, updateProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

// Get logged in user details
router.get("/me", verifyToken, getMe);

// Update user name + profile picture
router.patch(
    "/me",
    verifyToken,
    upload.single("profilePic"), // send form-data key: profilePic
    updateProfile
);

export default router;
