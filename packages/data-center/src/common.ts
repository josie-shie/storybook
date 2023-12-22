import { ZodError } from 'zod';

export type ReturnData<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: string;
      };

interface ErrorMessages {
    message: string;
}
export interface FetchResultData<T> {
    data: T;
    errors?: { message: string }[];
}

export const throwErrorMessage = (errors?: ErrorMessages[]) => {
    if (errors?.[0].message) {
        throw new Error(errors[0].message);
    }
};

export const handleApiError = (error: unknown): { success: false; error: string } => {
    let errorMessage = '<001> An unexpected error occurred.'; // 未知錯誤
    console.error(error);

    if (error instanceof ZodError) {
        errorMessage = '<002> Data validation error.'; // 資料格式不符合預期
    } else if (error instanceof Error) {
        errorMessage = error.message; // 其他
    }
    return {
        success: false,
        error: errorMessage
    };
};
