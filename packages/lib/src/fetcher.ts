import Cookies from 'js-cookie';

interface Fetcher<TData> {
    apiPath: string;
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    data?: TData;
    timeout?: number;
}

const handleUnauthorized = () => {
    setTimeout(() => {
        Cookies.remove('access');
        window.location.href = '/login';
    }, 2000);
};

export const fetcher = async <TResponse, TData>({
    apiPath,
    method = 'POST',
    headers = {},
    data,
    timeout = 10
}: Fetcher<TData>): Promise<TResponse> => {
    const controller = new AbortController();
    setTimeout(() => {
        controller.abort();
    }, timeout * 1000);

    try {
        const response = await fetch(`${apiPath}`, {
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

        const responseData: TResponse = (await response.json()) as TResponse;

        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
