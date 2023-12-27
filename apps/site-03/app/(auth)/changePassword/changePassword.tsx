import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl } from '@mui/material';
import type { UpdatePasswordRequest } from 'data-center';
import { getVerificationCaptcha, updatePassword } from 'data-center';
import { useEffect } from 'react';
import { useNotificationStore } from '@/app/notificationStore';
import {
    PasswordInput,
    SubmitButton,
    VertifyCodeByImage
} from '../components/authComponent/authComponent';
import { useAuthStore } from '../authStore';
import style from './changePassword.module.scss';

const schema = yup.object().shape({
    verificationCode: yup.string().required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/, '请输入6-16位英文+数字')
        .required(),
    newPassword: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/, '请输入6-16位英文+数字')
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], '请输入6-16位英文+数字')
        .required('確認密碼為必填欄位'),
    verifyToken: yup.string().required()
});

function ChangePassword() {
    const changePasswordStore = useAuthStore.use.changePassword();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const { verifyPhoto, setVerifyPhoto } = changePasswordStore;

    const { control, formState, handleSubmit, watch, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            verificationCode: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
            verifyToken: ''
        }
    });

    const errors = formState.errors;

    const { verificationCode, password, newPassword, confirmPassword, verifyToken } = watch();

    const isSubmitDisable =
        !verificationCode || !password || !newPassword || !confirmPassword || !verifyToken;

    const onSubmit = async (data: UpdatePasswordRequest) => {
        const res = await updatePassword(data);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '修改密码失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setIsDrawerOpen(false);
        setIsVisible('修改密码成功！', 'success');
        reset();
    };

    const getCaptcha = async () => {
        const res = await getVerificationCaptcha();

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得验证图形失败';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setVerifyPhoto(res.data.captcha);
        setValue('verifyToken', res.data.verifyToken);
    };

    useEffect(() => {
        void getCaptcha();
    }, []);

    return (
        <form className={style.changePassword} onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="verificationCode"
                    render={({ field }) => (
                        <VertifyCodeByImage
                            error={errors.verificationCode}
                            field={field}
                            getVerificationCode={getCaptcha}
                            placeholder="验证码"
                            verifyPhoto={verifyPhoto}
                            vertifyDisable={false}
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <PasswordInput
                            error={errors.password}
                            field={field}
                            id="password"
                            placeholder="旧密码6-16位英文+数字"
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                        <PasswordInput
                            error={errors.newPassword}
                            field={field}
                            id="newPassword"
                            placeholder="新密码6-16位英文+数字"
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <PasswordInput
                            error={errors.confirmPassword}
                            field={field}
                            id="confirmPassword"
                            placeholder="再次输入新密码"
                        />
                    )}
                />
            </FormControl>
            <FormControl>
                <input name="verifyToken" type="hidden" value={verifyToken} />
            </FormControl>
            <FormControl className={style.submitButton} fullWidth>
                <SubmitButton disabled={isSubmitDisable} label="提交" />
            </FormControl>
        </form>
    );
}

export default ChangePassword;
