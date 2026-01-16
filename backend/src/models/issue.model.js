import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    location: { lat: Number, lng: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" }
}, { timestamps: true });

export const Issue = mongoose.model("Issue", issueSchema);
