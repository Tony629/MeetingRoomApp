import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface LoginUser {
    email: string;
    isAdmin: boolean;
}

interface AuthContextType {
    user: { email: string; isAdmin: boolean } | null;
    login: (email: string, password: string) => void;
    isLoggedIn: boolean;
    logout: () => void;
}

interface AutoContextProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export const AuthProvider = ({ children }: AutoContextProviderProps) => {
    const [user, setUser] = useState<LoginUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isAuthenticated = Cookies.get('isAuthenticated');
        const loginUser = Cookies.get('loginUser');

        setIsLoggedIn(isAuthenticated);
        setUser(loginUser);

    }, [isLoggedIn, user]);

    const login = (email: string, password: string) => {
        if (email === 'tony.zhang@shinetechsoftware.com' && password === '123456') {
            setUser({ email, isAdmin: true });
        } else if (email && password) {
            setUser({ email, isAdmin: false });
        }

        Cookies.set('isAuthenticated', 'true', { expires: 6 / 24 });
        Cookies.set('loginUser', email, { expires: 6 / 24 });
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);

        Cookies.remove('isAuthenticated');
        Cookies.remove('loginUser');
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;