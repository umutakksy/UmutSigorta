import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CalisanDashboard() {
    const [teklifler, setTeklifler] = useState([]);
    const [yorumlar, setYorumlar] = useState({});
    const [loading, setLoading] = useState(false);
    const [mesaj, setMesaj] = useState("");

    useEffect(() => {
        async function fetchTeklifler() {
            try {
                setLoading(true);
                const res = await api.get("/teklif/calisan");
                setTeklifler(res.data);
            } catch (err) {
                setMesaj("Teklifler yüklenirken hata oluştu.");
            } finally {
                setLoading(false);
            }
        }
        fetchTeklifler();
    }, []);

    const handleDurumGuncelle = async (id, durum) => {
        try {
            await api.put(`/teklif/${id}`, { durum });
            const res = await api.get("/teklif/calisan");
            setTeklifler(res.data);
        } catch (err) {
            setMesaj("Durum güncellenirken hata oluştu.");
        }
    };

    const handleYorumChange = (id, value) => {
        setYorumlar((prev) => ({ ...prev, [id]: value }));
    };

    const handleYorumKaydet = async (id) => {
        try {
            await api.put(`/teklif/${id}`, { calisanYorum: yorumlar[id] });
            const res = await api.get("/teklif/calisan");
            setTeklifler(res.data);
            setMesaj("Yorum kaydedildi.");
        } catch (err) {
            setMesaj("Yorum kaydedilirken hata oluştu.");
        }
    };

    if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

    return (
        <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Çalışan Paneli</h2>
            {mesaj && <p className="mb-4 text-green-600">{mesaj}</p>}

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Müşteri</th>
                    <th className="border border-gray-300 p-2">Sigorta Türü</th>
                    <th className="border border-gray-300 p-2">Açıklama</th>
                    <th className="border border-gray-300 p-2">Tutar</th>
                    <th className="border border-gray-300 p-2">Durum</th>
                    <th className="border border-gray-300 p-2">Yorum</th>
                    <th className="border border-gray-300 p-2">İşlem</th>
                </tr>
                </thead>
                <tbody>
                {teklifler.map((t) => (
                    <tr key={t._id}>
                        <td className="border border-gray-300 p-2">{t.kullanici?.adSoyad || "Bilinmiyor"}</td>
                        <td className="border border-gray-300 p-2">{t.sigortaTuru}</td>
                        <td className="border border-gray-300 p-2">{t.aciklama}</td>
                        <td className="border border-gray-300 p-2">{t.tutar} TL</td>
                        <td className="border border-gray-300 p-2">
                            <select
                                value={t.durum || "Beklemede"}
                                onChange={(e) => handleDurumGuncelle(t._id, e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option>Beklemede</option>
                                <option>Onaylandı</option>
                                <option>Reddedildi</option>
                            </select>
                        </td>
                        <td className="border border-gray-300 p-2">
                <textarea
                    rows="2"
                    value={yorumlar[t._id] || t.calisanYorum || ""}
                    onChange={(e) => handleYorumChange(t._id, e.target.value)}
                    className="w-full border rounded px-2 py-1"
                />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <button
                                onClick={() => handleYorumKaydet(t._id)}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                                Kaydet
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
