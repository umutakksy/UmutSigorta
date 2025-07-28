import { useEffect, useState } from "react";
import api from "../../services/api";

export default function YoneticiDashboard() {
    const [aktiviteler, setAktiviteler] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mesaj, setMesaj] = useState("");

    useEffect(() => {
        async function fetchAktiviteler() {
            try {
                setLoading(true);
                const res = await api.get("/aktivite");
                setAktiviteler(res.data);
            } catch (err) {
                setMesaj("Aktiviteler yüklenirken hata oluştu.");
            } finally {
                setLoading(false);
            }
        }
        fetchAktiviteler();
    }, []);

    if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Yönetici Paneli</h2>
            {mesaj && <p className="mb-4 text-red-600">{mesaj}</p>}

            {aktiviteler.length === 0 ? (
                <p>Aktivite bulunamadı.</p>
            ) : (
                <ul className="list-disc list-inside space-y-2 max-h-96 overflow-y-auto border border-gray-300 p-4 rounded">
                    {aktiviteler.map((akt) => (
                        <li key={akt._id}>
                            <strong>{akt.kullanici?.adSoyad || "Bilinmiyor"}:</strong> {akt.mesaj}{" "}
                            <em>({new Date(akt.tarih).toLocaleString()})</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
