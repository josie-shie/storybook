import Cookies from 'js-cookie';

interface Fetcher<TData> {
    apiPath: string;
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    data?: TData;
    timeout?: number;
}

export const fetcher = async <TResponse, TData>({
    apiPath,
    method = 'POST',
    headers = {},
    data,
    timeout = 10
}: Fetcher<TData>): Promise<TResponse> => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout * 1000);

    try {
        const response = await fetch(`${apiPath}` as string, {
            method,
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                Authorization: Cookies.get('access') || '',
                'content-type': 'application/json',
                ...headers
            },
            signal: controller.signal
        });

        if (response.status === 401) {
            handleUnauthorized();
            throw new Error('Unauthorized');
        }

        const responseData = await response.json();
        if ('errors' in responseData) {
            console.error(responseData.errors[0].message);
        }
        return responseData as TResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const handleUnauthorized = () => {
    console.error('登入狀態過期，請重新登入');
    setTimeout(() => {
        Cookies.remove('access');
        window.location.href = '/login';
    }, 2000);
};

export const postFile = async (uploadPath: '', file: File) => {
    try {
        const response = await fetch(`${uploadPath}`, {
            method: 'POST',
            body: file,
            headers: {
                'content-type': file.type,
                Authorization: Cookies.get('access') || ''
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
