import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    saved: [{ name: { type: String, required: true } }] // Array for storing characters
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
