import { useLocalStorage } from './useLocalStorage';
import { LoggedInUserData } from '../../types/data';

// Used in useAuth.ts

export const useUser = () => {
    const { setItem, getItem, removeItem } = useLocalStorage();

    function storeUser(user: LoggedInUserData) {
        setItem('user', user);
    }

    function removeUser() {
        removeItem('user');
    }

    function getUser(): LoggedInUserData | null {
        return getItem<LoggedInUserData>('user');
    }

    return {
        storeUser,
        getUser,
        removeUser,
    };
};
