import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [tokenExpiryTimeout, setTokenExpiryTimeout] = useState(null);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        if (tokenExpiryTimeout) clearTimeout(tokenExpiryTimeout);
    };

    const scheduleLogout = (token) => {
        if (!token) return;

        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        const expiryTime = decodedToken.exp * 1000 - Date.now(); // Calculate remaining time in milliseconds

        if (expiryTime > 0) {
            const timeoutId = setTimeout(() => {
                logout();
                toast.error('Session expired. Please log in again.');
            }, expiryTime);
            setTokenExpiryTimeout(timeoutId);
        } else {
            logout(); // Token is already expired
        }
    };

    const login = (userData) => {
        setUser(userData);
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            scheduleLogout(userData.token);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            scheduleLogout(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
