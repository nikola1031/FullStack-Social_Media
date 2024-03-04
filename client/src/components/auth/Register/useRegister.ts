import { useRef, useState } from 'react';
import { useUserAuth } from '../../../api/useUserAuth';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { timeoutMessage } from '../../../utils/timeoutMessage';
import { RegisterDetails } from '../../../types/data';

export function useRegister() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const timeoutId = useRef<number | undefined>();
    const navigate = useNavigate();
    const { register: apiRegister } = useUserAuth();
    const { saveUser } = useAuthContext();
    
    async function register(data: RegisterDetails) {
        setError(null);
        setIsLoading(true);
        
        try {
            const user = await apiRegister(data);
            if (user) {
                saveUser(user);
                navigate('/', { replace: true });
            }

            timeoutMessage(setError,'Registration failed - try again later', timeoutId);
        } catch (error: any) {
            timeoutMessage(setError, error.message, timeoutId);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        error,
        isLoading,
        register
    }
}
