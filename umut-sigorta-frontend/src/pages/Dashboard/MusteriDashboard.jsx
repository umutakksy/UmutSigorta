import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

export default function MusteriDashboard() {
    const { user } = useAuth();
    const [teklifler, setTeklifler] = useState([]);
    const [yeniTeklif, setYeniTeklif] = useState({
        sigortaTuru: "",
        aciklama: "",
        tutar: "",
    });
    const [mesaj, setMesaj] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchTeklifler() {
            try {
                const res = await api.get("/teklif/musteri");
                setTeklifler(res.data);
            } catch (err) {
                setMesaj("Teklifler yüklenirken hata oluştu.");
            }
        }
        fetchTeklifler();
    }, []);

    const handleChange = (e) => {
        setYeniTeklif({ ...yeniTeklif, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMesaj("");
        setLoading(true);
        try {
            await api.post("/teklif", yeniTeklif);
            setMesaj("Teklif başarıyla gönderildi.");
            setYeniTeklif({ sigortaTuru: "", aciklama: "", tutar: "" });
            const res = await api.get("/teklif/musteri");
            setTeklifler(res.data);
        } catch (err) {
            setMesaj(err.response?.data?.mesaj || "Teklif gönderilemedi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Hoşgeldin, {user.adSoyad}</h2>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Yeni Teklif Oluştur</h3>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <select
                        name="sigortaTuru"
                        value={yeniTeklif.sigortaTuru}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Sigorta Türü Seçiniz</option>
                        <option value="Kasko">Kasko</option>
                        <option value="DASK">DASK</option>
                        <option value="Sağlık">Sağlık</option>
                        <option value="Konut">Konut</option>
                        <option value="Trafik">Trafik</option>
                    </select>

                    <textarea
                        name="aciklama"
                        value={yeniTeklif.aciklama}
                        onChange={handleChange}
                        placeholder="Açıklama"
                        className="w-full border px-3 py-2 rounded"
                        rows="3"
                    />

                    <input
                        type="number"
                        name="tutar"
                        value={yeniTeklif.tutar}
                        onChange={handleChange}
                        placeholder="Teklif Tutarı (TL)"
                        required
                        min="0"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <button
                        disabled={loading}
                        type="submit"
                        className={`bg-blue-700 text-white py-2 px-6 rounded hover:bg-blue-800 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Gönderiliyor..." : "Teklif Gönder"}
                    </button>
                </form>
                {mesaj && <p className="mt-4 text-green-600">{mesaj}</p>}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-4">Teklifleriniz</h3>
                {teklifler.length === 0 ? (
                    <p>Henüz teklifiniz yok.</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Sigorta Türü</th>
                            <th className="border border-gray-300 p-2">Durum</th>
                            <th className="border border-gray-300 p-2">Tutar</th>
                            <th className="border border-gray-300 p-2">Çalışan Yorumu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teklifler.map((t) => (
                            <tr key={t._id}>
                                <td className="border border-gray-300 p-2">{t.sigortaTuru}</td>
                                <td className="border border-gray-300 p-2">{t.durum || "Beklemede"}</td>
                                <td className="border border-gray-300 p-2">{t.tutar} TL</td>
                                <td className="border border-gray-300 p-2">{t.calisanYorum || "-"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
