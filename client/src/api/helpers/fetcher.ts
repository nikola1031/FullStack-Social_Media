const baseUrl = 'http://localhost:3000/api';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request(method: Method, url: string, data: any, token?: string): Promise<any>  {
    const options = createOptions(method, data, token);

    try {
        const response = await fetch(baseUrl + url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
       
        return response.json();
    } catch (error) {
        throw error;
    }
}

interface Options {
    method: string;
    headers: Record<string, string>;
    body?: string;
}

function createOptions(method: Method, data: any, token: string = '') {
    const options: Options = { method, headers: {} };
    if (method !== 'GET') {
        options.headers['Content-Type'] = 'application/json';
    }

    if (data) {
        options.body = JSON.stringify(data);
    }


    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    return options;
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {get, post, put, del};
