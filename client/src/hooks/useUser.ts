import { useLocalStorage } from './useLocalStorage';
import { IUserData } from '../types/data';

// Used in useAuth.ts

export const useUser = () => {
    const { setItem, getItem, removeItem } = useLocalStorage();

    function storeUser(user: IUserData) {
        setItem('user', user);
    }

    function removeUser() {
        removeItem('user');
    }

    function getUser(): IUserData | null {
        return getItem<IUserData>('user');
    }

    return {
        storeUser,
        getUser,
        removeUser,
    };
};
