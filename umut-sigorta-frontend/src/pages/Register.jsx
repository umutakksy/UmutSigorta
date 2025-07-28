import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setError("");
        setSuccess("");
        if (data.sifre !== data.sifreOnay) {
            setError("Şifre ve şifre onayı eşleşmiyor.");
            return;
        }
        if (data.rol === "yonetici") {
            setError("Yönetici rolü kayıt ile seçilemez.");
            return;
        }

        try {
            await api.post("/auth/register", {
                adSoyad: data.adSoyad,
                email: data.email,
                sifre: data.sifre,
                rol: data.rol,
            });
            setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.mesaj || "Kayıt başarısız");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("adSoyad", { required: "Ad Soyad zorunlu" })}
                    type="text"
                    placeholder="Ad Soyad"
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.adSoyad && <p className="text-red-600">{errors.adSoyad.message}</p>}

                <input
                    {...register("email", {
                        required: "Email zorunlu",
                        pattern: { value: /^\S+@\S+$/i, message: "Geçerli email giriniz" },
                    })}
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                <input
                    {...register("sifre", {
                        required: "Şifre zorunlu",
                        minLength: { value: 6, message: "Şifre en az 6 karakter olmalı" },
                    })}
                    type="password"
                    placeholder="Şifre (min 6 karakter)"
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.sifre && <p className="text-red-600">{errors.sifre.message}</p>}

                <input
                    {...register("sifreOnay", {
                        required: "Şifre onayı zorunlu",
                    })}
                    type="password"
                    placeholder="Şifre Onayı"
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.sifreOnay && <p className="text-red-600">{errors.sifreOnay.message}</p>}

                <select
                    {...register("rol", { required: "Rol seçimi zorunlu" })}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">Rolünüzü seçin</option>
                    <option value="musteri">Müşteri</option>
                    <option value="calisan">Çalışan</option>
                </select>
                {errors.rol && <p className="text-red-600">{errors.rol.message}</p>}

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
                    Kayıt Ol
                </button>
            </form>
        </div>
    );
}
