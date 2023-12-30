import { IUserData } from '../types/user';
import * as requestApi from './helpers/fetcher';

const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
}

type LoginData = {
    email: string;
    password: string;
}

type RegisterData = LoginData & {
    username: string;
    confirmPass: string;
    gender: string;
}

export const login: (data: LoginData) => Promise<IUserData> = async (data) => requestApi.post(endpoints.login, data);
export const register: (data: RegisterData) => Promise<IUserData> = async (data) => requestApi.post(endpoints.register, data);
export const logout: (token: string) => Promise<void> = async (token) => requestApi.get(endpoints.logout, null, token);