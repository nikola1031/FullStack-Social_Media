import { LoggedInUserData } from '../types/data';
import { authEndpoints } from './ENDPOINTS';
import * as requestApi from './helpers/fetcher';
import { LoginDetails, RegisterDetails } from '../types/data';

export const login: (data: LoginDetails) => Promise<LoggedInUserData> = async (data) => {
    try {
        return requestApi.post(authEndpoints.login(), data);
    } catch (error) {
        throw error;        
    }
};

export const register: (data: RegisterDetails) => Promise<LoggedInUserData> = async (data) => {
    try {
        return requestApi.post(authEndpoints.register(), data)
    } catch (error) {
        throw error;        
    }
};

export const logout: () => Promise<void> = async () => {
    try {
        requestApi.get(authEndpoints.logout(), null)
    } catch (error) {
        throw error;        
    }
};