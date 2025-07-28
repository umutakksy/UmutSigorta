import mongoose from "mongoose";

const teklifSchema = new mongoose.Schema({
    kullanici: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sigortaTuru: { type: String, required: true },
    aciklama: { type: String, default: "" },
    tutar: { type: Number, required: true },
    durum: { type: String, enum: ["Beklemede", "Onaylandı", "Reddedildi"], default: "Beklemede" },
    calisanYorum: { type: String, default: "" },
}, { timestamps: true });

const Teklif = mongoose.model("Teklif", teklifSchema);

export default Teklif;
