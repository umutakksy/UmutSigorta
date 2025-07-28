import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import teklifRoutes from "./routes/teklifRoutes.js";
import aktiviteRoutes from "./routes/aktiviteRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("UmutSigorta API çalışıyor"));

app.use("/api/auth", authRoutes);
app.use("/api/teklif", teklifRoutes);
app.use("/api/aktivite", aktiviteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));