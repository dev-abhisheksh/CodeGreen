import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

// Get logged-in user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update profile (name + profilePic)
export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        let profilePic;

        if (req.file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "profiles" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            const result = await uploadPromise;
            profilePic = result.secure_url;
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    ...(name && { name }),
                    ...(profilePic && { profilePic })
                }
            },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Profile updated",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
