import { useRef, useState } from 'react';
import { login as authApiLogin } from '../../../api/auth';
import { useAuthContext } from '../../../hooks/useAuthContext';
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
    const { saveUser } = useAuthContext();
    
    async function login(data: LoginData) {
        setError(null);
        setIsLoading(true);
        
        try {
            const user = await authApiLogin(data);
            if (user) {
                saveUser(user);
                navigate('/', { replace: true });
            }

            timeoutMessage(setError,'Login failed - try again later', timeoutId);
        } catch (error: any) {
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
