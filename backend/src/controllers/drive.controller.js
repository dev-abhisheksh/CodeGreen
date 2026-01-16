import { Drive } from "../models/drive.model.js";

// Create a drive
export const createDrive = async (req, res) => {
    try {
        const { title, description, location, date } = req.body;

        if (!title || !description || !location || !date) {
            return res.status(400).json({ message: "All fields required" });
        }

        const drive = await Drive.create({
            title,
            description,
            location,
            date,
            createdBy: req.user._id
        });

        return res.status(201).json({
            message: "Drive created successfully",
            drive
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get all drives
export const getDrives = async (req, res) => {
    try {
        const drives = await Drive.find()
            .sort({ date: 1 })
            .populate("createdBy", "name email")
            .populate("volunteers", "name email");

        return res.status(200).json({ drives });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get single drive
export const getDriveById = async (req, res) => {
    try {
        console.log(req.params.id)
        const drive = await Drive.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("volunteers", "name email");

        if (!drive) return res.status(404).json({ message: "Drive not found" });

        return res.status(200).json({ drive });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Join drive
export const joinDrive = async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);

        if (!drive) return res.status(404).json({ message: "Drive not found" });

        // Already joined?
        if (drive.volunteers.includes(req.user._id)) {
            return res.status(400).json({ message: "Already joined this drive" });
        }

        drive.volunteers.push(req.user._id);
        await drive.save();

        // Populate AFTER save
        const populatedDrive = await Drive.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("volunteers", "name email");

        return res.status(200).json({
            message: "Joined drive successfully",
            drive: populatedDrive
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Leave drive
export const leaveDrive = async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);

        if (!drive) return res.status(404).json({ message: "Drive not found" });

        drive.volunteers = drive.volunteers.filter(
            (id) => id.toString() !== req.user._id
        );

        await drive.save();

        return res.status(200).json({ message: "Left drive successfully", drive });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
