import mongoose from "mongoose";

const driveSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["upcoming", "completed"], default: "upcoming" }
}, { timestamps: true });

export const Drive = mongoose.model("Drive", driveSchema);
