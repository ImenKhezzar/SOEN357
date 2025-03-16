import { createContext, useState, useMemo, useEffect, ReactNode } from 'react';

interface AuthContextType {
    auth: any; 
    setAuth: (auth: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {};
    });

    useEffect(() => {
        if (auth && Object.keys(auth).length > 0) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;