import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB bağlantısı başarılı");
    } catch (error) {
        console.error("MongoDB bağlantı hatası:", error);
        process.exit(1);
    }
};

export default connectDB;
