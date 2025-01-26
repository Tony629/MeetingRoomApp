import { createContext, useState, useContext, ReactNode } from 'react';

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

    const login = (email: string, password: string) => {
        if (email === 'tony.zhang@shinetechsoftware.com' && password === '123456') {
            setUser({ email, isAdmin: true });
        } else if (email && password) {
            setUser({ email, isAdmin: false });
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;