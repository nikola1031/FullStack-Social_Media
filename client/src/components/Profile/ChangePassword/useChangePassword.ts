import { useRef, useState } from 'react';
import { Passwords } from '../../../types/data';
import { timeoutMessage } from '../../../utils/timeoutMessage';
import { successMessages } from '../../../Constants';
import { useApiUsers } from '../../../api/useApiUser';

export function useChangePassword() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const timeoutId = useRef<number | undefined>();
    const userApi = useApiUsers();

    async function updatePassword({password, newPassword, confirmPass}: Passwords) {
        setError(null);
        setLoading(true);
        try {
            if (password === newPassword) {
                throw new Error('New password cannot be the same as the old one');
            }
            
            await userApi.updatePassword({password, newPassword, confirmPass});
            timeoutMessage(setSuccess, successMessages.passwordUpdate, timeoutId);
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return {
        error,
        loading,
        success,
        updatePassword
    }
}