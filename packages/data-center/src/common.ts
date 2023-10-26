import { ZodError } from 'zod';

export type ReturnData<T> = Promise<
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: string;
      }
>;

export const handleApiError = (error: unknown): { success: false; error: string } => {
    let errorMessage = '<001> An unexpected error occurred.'; // 未知錯誤
    console.error(error);

    if (error instanceof ZodError) {
        errorMessage = '<002> Data validation error.'; // 資料格式不符合預期
    } else if (error instanceof Error) {
        errorMessage = `<003> ${error.message}.`; // 其他
    }
    return {
        success: false,
        error: errorMessage
    };
};
