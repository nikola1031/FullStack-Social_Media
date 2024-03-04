import { useNavigate } from 'react-router-dom';
import { apiBaseUrl, siteBaseUrl } from '../Constants';
import { useAuth } from '../hooks/auth/useAuth';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Options {
    method: string;
    headers: Record<string, string>;
    body?: string | FormData;
}

export function useFetch() {
    // Can make it generic and add types for the object :?
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
    
    async function request(
        method: Method,
        url: string,
        data?: object | null
    ): Promise<any> {
        const options = createOptions(method, data);
        try {
            const response = await fetch(apiBaseUrl + url, options);
            if (!response.ok) {
                if (response.status === 403) {
                    logoutUser();
                    navigate(siteBaseUrl + '/login');
                    return
                }
                const error = await response.json();
                throw new Error(error.message);
            }

            if (response.status === 204) {
                return response;
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    const get = request.bind(null, 'GET');
    const post = request.bind(null, 'POST');
    const put = request.bind(null, 'PUT');
    const del = request.bind(null, 'DELETE');

    return { get, post, put, del };
}

function createOptions(method: Method, data?: any) {
    const options: Options = { method, headers: {} };
    const user = localStorage.getItem('user');

    let token;
    if (user) {
        const userData = JSON.parse(user);
        token = userData.accessToken;
    }

    if (method !== 'GET' && !(data instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
    }

    if (data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    return options;
}
