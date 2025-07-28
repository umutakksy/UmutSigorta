import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    adSoyad: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    sifreHash: { type: String, required: true },
    rol: { type: String, enum: ["musteri", "calisan", "yonetici"], default: "musteri" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
