import Teklif from "../models/Teklif.js";
import Aktivite from "../models/Aktivite.js";

export const teklifOlustur = async (req, res) => {
    const { sigortaTuru, aciklama, tutar } = req.body;

    if (!sigortaTuru || !tutar) {
        return res.status(400).json({ mesaj: "Sigorta türü ve tutar zorunludur" });
    }

    const teklif = await Teklif.create({
        kullanici: req.user._id,
        sigortaTuru,
        aciklama,
        tutar,
    });

    await Aktivite.create({
        kullanici: req.user._id,
        mesaj: `${req.user.adSoyad} yeni bir teklif oluşturdu (${sigortaTuru})`,
    });

    res.status(201).json(teklif);
};

export const musteriTeklifleriniGetir = async (req, res) => {
    const teklifler = await Teklif.find({ kullanici: req.user._id }).sort({ createdAt: -1 });
    res.json(teklifler);
};

export const calisanTeklifleriniGetir = async (req, res) => {
    const teklifler = await Teklif.find()
        .populate("kullanici", "adSoyad email rol")
        .sort({ createdAt: -1 });
    res.json(teklifler);
};

export const teklifGuncelle = async (req, res) => {
    const { id } = req.params;
    const { durum, calisanYorum } = req.body;

    const teklif = await Teklif.findById(id);
    if (!teklif) {
        return res.status(404).json({ mesaj: "Teklif bulunamadı" });
    }

    if (durum) {
        if (!["Beklemede", "Onaylandı", "Reddedildi"].includes(durum)) {
            return res.status(400).json({ mesaj: "Geçersiz durum değeri" });
        }
        teklif.durum = durum;
    }

    if (calisanYorum !== undefined) {
        teklif.calisanYorum = calisanYorum;
    }

    await teklif.save();

    await Aktivite.create({
        kullanici: req.user._id,
        mesaj: `${req.user.adSoyad} teklif güncelledi: ${teklif._id}`,
    });

    res.json(teklif);
};
