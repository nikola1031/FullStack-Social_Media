import { createContext } from 'react';
import { LoggedInUserData } from '../types/data';
import { useAuth } from '../hooks/auth/useAuth';

interface IAuthContext {
    user: LoggedInUserData | null;
    saveUser: (user: LoggedInUserData) => void;
    logoutUser: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    saveUser: () => {},
    logoutUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const contextValues = useAuth();

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
}
