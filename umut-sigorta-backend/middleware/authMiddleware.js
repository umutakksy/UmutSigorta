import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-sifreHash");
            if (!req.user) {
                return res.status(401).json({ mesaj: "Kullanıcı bulunamadı" });
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ mesaj: "Token geçersiz veya süresi dolmuş" });
        }
    }

    if (!token) {
        return res.status(401).json({ mesaj: "Token bulunamadı, yetkisiz erişim" });
    }
};
