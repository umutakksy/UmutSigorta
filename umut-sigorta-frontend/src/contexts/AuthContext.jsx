import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);
                } else {
                    localStorage.removeItem("token");
                }
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = ({ token, user }) => {
        localStorage.setItem("token", token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
