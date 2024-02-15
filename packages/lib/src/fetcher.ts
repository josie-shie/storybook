import Cookies from 'js-cookie';

interface Fetcher<TData> {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    data?: TData;
    timeout?: number;
}

const handleUnauthorized = () => {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            Cookies.remove('access');
            if (!window.location.search.includes('auth=login')) {
                window.location.href = '?auth=login';
            }
        }, 1000);
    }
};

const apiPath: string | undefined = process.env.NEXT_PUBLIC_API_PATH;

export const fetcher = async <TResponse, TData>(
    { method = 'POST', headers = {}, data, timeout = 30 }: Fetcher<TData>,
    option = {}
): Promise<TResponse> => {
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
            signal: controller.signal,
            ...option
        });

        if (response.status === 401) {
            handleUnauthorized();
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            throw new Error('failed to fetching');
        }

        const responseData = (await response.json()) as TResponse;

        return responseData;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};
