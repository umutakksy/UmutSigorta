import Aktivite from "../models/Aktivite.js";

export const aktiviteListele = async (req, res) => {
    const aktiviteler = await Aktivite.find()
        .populate("kullanici", "adSoyad email rol")
        .sort({ tarih: -1 });
    res.json(aktiviteler);
};
