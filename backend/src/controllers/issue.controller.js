import { Issue } from "../models/issue.model.js";
import cloudinary from "../utils/cloudinary.js";


// Create Issue
export const createIssue = async (req, res) => {
    try {
        const { title, description, location } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title & description required" });
        }

        let imageUrl = "";

        if (req.file) {
            // Upload image buffer to Cloudinary
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "issues" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            const result = await uploadPromise;
            imageUrl = result.secure_url;
        }

        const issue = await Issue.create({
            title,
            description,
            imageUrl,
            location: location || "",
            createdBy: req.user._id
        });


        return res.status(201).json({
            message: "Issue created successfully",
            issue
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get All Issues
export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find()
            .sort({ createdAt: -1 })
            .populate("createdBy", "name email");

        return res.status(200).json({ issues });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get Single Issue
export const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        return res.status(200).json({ issue });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Update Issue Status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        if (issue.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        issue.status = status || issue.status;
        await issue.save();

        return res.status(200).json({ message: "Status updated", issue });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
