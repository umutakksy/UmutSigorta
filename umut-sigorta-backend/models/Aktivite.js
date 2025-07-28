import mongoose from "mongoose";

const aktiviteSchema = new mongoose.Schema({
    kullanici: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mesaj: { type: String, required: true },
    tarih: { type: Date, default: Date.now },
});

const Aktivite = mongoose.model("Aktivite", aktiviteSchema);

export default Aktivite;
