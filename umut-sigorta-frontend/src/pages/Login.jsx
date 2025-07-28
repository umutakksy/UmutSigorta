import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/login", data);
            login(res.data);
            setLoading(false);
            if (res.data.user.rol === "musteri") navigate("/musteri");
            else if (res.data.user.rol === "calisan") navigate("/calisan");
            else if (res.data.user.rol === "yonetici") navigate("/yonetici");
        } catch (err) {
            setError(err.response?.data?.mesaj || "Giriş başarısız");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input
                    {...register("sifre", { required: true })}
                    type="password"
                    placeholder="Şifre"
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                {error && <p className="text-red-600">{error}</p>}
                <button
                    disabled={loading}
                    type="submit"
                    className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}`}
                >
                    {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
        </div>
    );
}
