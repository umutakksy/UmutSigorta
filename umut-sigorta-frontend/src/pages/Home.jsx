import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">UmutSigorta'ya Hoşgeldiniz</h1>
            <div className="space-x-4">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100"
                >
                    Giriş Yap
                </button>
                <button
                    onClick={() => navigate("/register")}
                    className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100"
                >
                    Kayıt Ol
                </button>
            </div>
        </div>
    );
}
