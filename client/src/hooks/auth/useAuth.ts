import { useEffect, useState } from 'react';
import { useUser } from './useUser';
import { LoggedInUserData } from '../../types/data';

// used in AuthContext.tsx

export function useAuth() {
    const { storeUser, removeUser, getUser } = useUser();

    const [user, setUser] = useState<LoggedInUserData | null>(() => {
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
            setUser(user);
        } else {
            setUser(null);
        }
    }, []);

    function saveUser(user: LoggedInUserData) {
        setUser(user);
        storeUser(user);
    }

    function logoutUser() {
        removeUser();
        setUser(() => {
            return null
        });
    }

    return {
        user,
        saveUser,
        logoutUser,
    };
}
