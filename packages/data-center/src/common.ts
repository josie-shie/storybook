import { ZodError } from 'zod';

export const handleApiError = (error: unknown): { success: false; error: string } => {
    let errorMessage = '<001> An unexpected error occurred.'; // 未知錯誤

    if (error instanceof ZodError) {
        errorMessage = '<002> Data validation error:'; // 資料格式不符合預期
        for (const subError of error.errors) {
            errorMessage += `\n${subError.message}`;
        }
    } else if (error instanceof Error) {
        errorMessage = `<003> ${error.message}`; // 其他
    }

    return {
        success: false,
        error: errorMessage
    };
};
