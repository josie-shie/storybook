import Cookies from 'js-cookie';

export const uploadImage = async <Response>(uploadPath: '', file: File) => {
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
        return (await response.json()) as Response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
