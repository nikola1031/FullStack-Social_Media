import { useRef, useState } from "react";
import { ProfileContextType, UserDataDTO } from "../../../types/data";
import { useOutletContext } from "react-router-dom";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { successMessages } from "../../../Constants";
import { timeoutMessage } from "../../../utils/timeoutMessage";
import { useApiUsers } from "../../../api/useApiUser";

export function useUpdateProfile() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const timeoutId = useRef<number | undefined>();
    const userApi = useApiUsers();

    const { setUser } = useOutletContext<ProfileContextType>();
    const { user: loggedInUser, saveUser } = useAuthContext();

    async function updateProfile({email, username, bio, password}: UserDataDTO) {
        setLoading(true);
        setError(null);

        try {
            await userApi.updateProfile({email, username, bio, password});
            setUser((prevUser) => ({...prevUser, username, email, bio}));
            saveUser({...loggedInUser!, email, username});
            timeoutMessage(setSuccess, successMessages.profileUpdate, timeoutId);
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { error, success, loading, updateProfile }
}