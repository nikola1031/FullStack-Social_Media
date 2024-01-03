import { useEffect, useState } from 'react';
import { useUser } from './useUser';
import { IUserData } from '../types/user';

// used in AuthContext.tsx

export function useAuth() {
    const { storeUser, removeUser, getUser } = useUser();

    const [user, setUser] = useState<IUserData | null>(() => {
        const storedUser = getUser();
        if (storedUser) {
            storeUser(storedUser);
            return storedUser;
        }
        return null;
    });
    

    useEffect(() => {
        const user = getUser();
        if (user) {
            storeUser(user);
            setUser(user)
        }
    }, []);

    function saveUser(user: IUserData) {
        setUser(user);
        storeUser(user)
    }

    function logoutUser() {
        removeUser();
        setUser(null);
    }

    return {
        user,
        saveUser,
        logoutUser,
    };
}
