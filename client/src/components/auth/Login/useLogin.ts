import { useRef, useState } from 'react';
import { useUserAuth } from '../../../api/useUserAuth';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { timeoutMessage } from '../../../utils/timeoutMessage';

interface LoginData {
    email: string;
    password: string;
}

export function useLogin() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const timeoutId = useRef<number | undefined>();
    const navigate = useNavigate();
    const { login: apiLogin } = useUserAuth();
    const { saveUser } = useAuthContext();
    
    async function login(data: LoginData) {
        setError(null);
        setIsLoading(true);
        
        try {
            const user = await apiLogin(data);
            if (user) {
                saveUser(user);
                navigate('/', { replace: true });
            }
            timeoutMessage(setError,'Login failed - try again later', timeoutId);
        } catch (error: any) {
            console.log(error)
            timeoutMessage(setError, error.message, timeoutId);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        error,
        isLoading,
        login
    }
}
