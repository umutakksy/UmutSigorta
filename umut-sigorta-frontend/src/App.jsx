import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MusteriDashboard from "./pages/Dashboard/MusteriDashboard";
import CalisanDashboard from "./pages/Dashboard/CalisanDashboard";
import YoneticiDashboard from "./pages/Dashboard/YoneticiDashboard";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Tüm Dashboard'lar sadece loginli kullanıcılar için */}
                    <Route element={<PrivateRoute />}>
                        {/* Müşteri dashboard sadece musteri rolü için */}
                        <Route element={<RoleRoute allowedRoles={["musteri"]} />}>
                            <Route path="musteri" element={<MusteriDashboard />} />
                        </Route>

                        {/* Çalışan dashboard sadece calisan rolü için */}
                        <Route element={<RoleRoute allowedRoles={["calisan"]} />}>
                            <Route path="calisan" element={<CalisanDashboard />} />
                        </Route>

                        {/* Yönetici dashboard sadece yonetici rolü için */}
                        <Route element={<RoleRoute allowedRoles={["yonetici"]} />}>
                            <Route path="yonetici" element={<YoneticiDashboard />} />
                        </Route>
                    </Route>

                    {/* 404 sayfası */}
                    <Route path="*" element={<div className="p-8 text-center">Sayfa bulunamadı.</div>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
