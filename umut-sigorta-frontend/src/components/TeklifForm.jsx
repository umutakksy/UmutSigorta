import React, { useState } from 'react';

export default function TeklifForm() {
    const [formData, setFormData] = useState({
        adSoyad: '',
        email: '',
        mesaj: ''
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            const response = await fetch("http://localhost:5000/api/teklif", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                setFormData({ adSoyad: '', email: '', mesaj: '' });
                setStatus("✅ Teklif başarıyla gönderildi!");
            } else {
                setStatus("❌ Hata: " + (result.mesaj || "Gönderilemedi"));
            }
        } catch (err) {
            setStatus("❌ Sunucuya bağlanılamadı.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Teklif Formu</h2>
            <input
                type="text"
                name="adSoyad"
                placeholder="Ad Soyad"
                value={formData.adSoyad}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 border rounded"
            />
            <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 border rounded"
            />
            <textarea
                name="mesaj"
                placeholder="Mesajınız"
                value={formData.mesaj}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 mb-4 border rounded"
            ></textarea>
            <button
                type="submit"
                className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 transition"
            >
                Gönder
            </button>
            {status && <p className="mt-4 text-center">{status}</p>}
        </form>
    );
}
