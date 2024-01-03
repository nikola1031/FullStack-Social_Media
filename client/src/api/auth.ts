import { IUserData } from '../types/user';
import { authEndpoints } from './ENDPOINTS';
import * as requestApi from './helpers/fetcher';

type LoginData = {
    email: string;
    password: string;
}

type RegisterData = LoginData & {
    username: string;
    confirmPass: string;
    gender: string;
}

export const login: (data: LoginData) => Promise<IUserData> = async (data) => requestApi.post(authEndpoints.login(), data);
export const register: (data: RegisterData) => Promise<IUserData> = async (data) => requestApi.post(authEndpoints.register(), data);
export const logout: (token: string) => Promise<void> = async (token) => requestApi.get(authEndpoints.logout(), null, token);