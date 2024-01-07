import { createContext } from 'react';
import { IUserData } from '../types/data';
import { useAuth } from '../hooks/useAuth';

interface IAuthContext {
    user: IUserData | null;
    saveUser: (user: IUserData) => void;
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
