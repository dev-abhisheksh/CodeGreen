import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo DB connected successfully`)
    } catch (error) {
        console.error("Failed to connect to MongoDB", error)
        process.exit(1);
    }
}

export default connectDB