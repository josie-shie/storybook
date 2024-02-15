import Cookies from 'js-cookie';

export const uploadImage = async <Response>() => {
    const uploadPath = process.env.NEXT_PUBLIC_UPLOAD_API_PATH;

    try {
        const response = await fetch(`${uploadPath}`, {
            method: 'POST',
            headers: {
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

export const uploadImageToS3 = async <Response>(file: Blob, preSignedUrl: string) => {
    try {
        const response = await fetch(preSignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return { success: true } as Response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};