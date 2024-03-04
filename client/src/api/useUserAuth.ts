import { LoggedInUserData } from '../types/data';
import { authEndpoints } from './ENDPOINTS';
import { useFetch } from './useFetch';
import { LoginDetails, RegisterDetails } from '../types/data';

export function useUserAuth() {
    const { post } = useFetch()

    const login: (data: LoginDetails) => Promise<LoggedInUserData> = async (data) => {
        try {
            return post(authEndpoints.login(), data);
        } catch (error) {
            console.log(error)
            throw error;        
        }
    };
    
    const register: (data: RegisterDetails) => Promise<LoggedInUserData> = async (data) => {
        try {
            return post(authEndpoints.register(), data);
        } catch (error) {
            throw error;        
        }
    };

    return {
        login,
        register,
    }

}
