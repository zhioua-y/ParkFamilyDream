import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                // Map backend user to frontend expected structure
                // Backend returns: { _id, username, token } (and we assume role=admin for now from backend logic)
                // specific logic: backend user model has role 'admin' by default.
                // frontend expects: { type: 'admin', ... }

                const user = {
                    ...data,
                    type: 'admin' // Force type admin as our backend only registers admins for now
                };

                setCurrentUser(user);
                setToken(data.token);
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', data.token);
                return { success: true, user };
            } else {
                return { success: false, error: data.error || 'Login failed' };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    };

    const value = {
        currentUser,
        token,
        login,
        logout,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.type === 'admin',
        isEmployee: currentUser?.type === 'employe'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
