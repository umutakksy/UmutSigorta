export const authorizeRoles = (...roller) => {
    return (req, res, next) => {
        if (!roller.includes(req.user.rol)) {
            return res.status(403).json({ mesaj: "Bu işlemi yapmak için yetkiniz yok" });
        }
        next();
    };
};
