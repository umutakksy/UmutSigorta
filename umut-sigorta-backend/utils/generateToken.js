import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            rol: user.rol,
            adSoyad: user.adSoyad,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

export default generateToken;
