import { useLocalStorage } from './useLocalStorage';
import { IUserData } from '../types/user';

// Used in useAuth.ts

export const useUser = () => {
    const { setItem, getItem } = useLocalStorage();

    function storeUser(user: IUserData) {
        setItem('user', user);
    }

    function removeUser() {
        setItem('user', null);
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
