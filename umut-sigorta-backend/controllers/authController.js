import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { adSoyad, email, sifre, rol } = req.body;

    if (!adSoyad || !email || !sifre) {
        return res.status(400).json({ mesaj: "Lütfen tüm zorunlu alanları doldurun" });
    }

    if (rol === "yonetici") {
        return res.status(403).json({ mesaj: "Yönetici rolü kayıt sırasında atanamaz" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return res.status(400).json({ mesaj: "Bu email zaten kullanılıyor" });
    }

    const salt = await bcrypt.genSalt(10);
    const sifreHash = await bcrypt.hash(sifre, salt);

    const user = await User.create({
        adSoyad,
        email: email.toLowerCase(),
        sifreHash,
        rol,
    });

    if (user) {
        res.status(201).json({
            user: {
                id: user._id,
                adSoyad: user.adSoyad,
                email: user.email,
                rol: user.rol,
            },
            token: generateToken(user),
        });
    } else {
        res.status(400).json({ mesaj: "Kullanıcı oluşturulamadı" });
    }
};

export const loginUser = async (req, res) => {
    const { email, sifre } = req.body;

    if (!email || !sifre) {
        return res.status(400).json({ mesaj: "Email ve şifre zorunludur" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return res.status(401).json({ mesaj: "Geçersiz email veya şifre" });
    }

    const isMatch = await bcrypt.compare(sifre, user.sifreHash);
    if (!isMatch) {
        return res.status(401).json({ mesaj: "Geçersiz email veya şifre" });
    }

    res.json({
        user: {
            id: user._id,
            adSoyad: user.adSoyad,
            email: user.email,
            rol: user.rol,
        },
        token: generateToken(user),
    });
};
