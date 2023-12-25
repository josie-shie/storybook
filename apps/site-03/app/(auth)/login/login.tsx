'use client';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl } from '@mui/material';
import type { LoginRequest } from 'data-center';
import { sendVerificationCode, login } from 'data-center';
import {
    VertifyCodeByImage,
    Aggrement,
    SubmitButton,
    CountryCodeInput,
    PhoneNumberInput,
    PasswordInput
} from '@/app/(auth)/components/authComponent/authComponent';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '../authStore';
import style from './login.module.scss';

const schema = yup.object().shape({
    mobileNumber: yup
        .string()
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/)
        .required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/)
        .required(),
    verificationCode: yup.string().required(),
    countryCode: yup.string().required()
});

function Login() {
    const setToken = useUserStore.use.setToken();
    const loginStore = useAuthStore.use.login();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const { verifyPhoto, setVerifyPhoto } = loginStore;
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const removeAuthQuery = useAuthStore.use.removeAuthQuery();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            mobileNumber: '',
            password: '',
            verificationCode: '',
            countryCode: '+86'
        }
    });

    const { countryCode, mobileNumber, password, verificationCode } = watch();

    const onSubmit = async (data: LoginRequest) => {
        const res = await login(data);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '登录失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setIsDrawerOpen(false);
        setToken(res.data);
        setIsVisible('登入成功！', 'success');
        removeAuthQuery();
        location.reload();
    };

    const getVerificationCode = async () => {
        const res = await sendVerificationCode({
            countryCode,
            mobileNumber,
            verificationType: 1,
            checkExistingAccount: false
        });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得验证码失败';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setVerifyPhoto(res.data);
    };

    const isSendVerificationCodeDisable = !countryCode || !mobileNumber || !password;
    const isLoginDisable = isSendVerificationCodeDisable || !verificationCode || !verifyPhoto;

    return (
        <form className={style.login} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.phone}>
                <div className={style.input}>
                    <FormControl fullWidth sx={{ width: '120px' }}>
                        <CountryCodeInput />
                    </FormControl>
                    <FormControl fullWidth sx={{ width: '206px' }}>
                        <Controller
                            control={control}
                            name="mobileNumber"
                            render={({ field }) => (
                                <PhoneNumberInput error={errors.mobileNumber} field={field} />
                            )}
                        />
                    </FormControl>
                </div>
                {errors.mobileNumber ? (
                    <div className={style.errorMessage}>请输入手机号码</div>
                ) : null}
            </div>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <PasswordInput
                            error={errors.password}
                            field={field}
                            placeholder="6-16位英文+数字密码"
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="verificationCode"
                    render={({ field }) => (
                        <VertifyCodeByImage
                            error={errors.verificationCode}
                            field={field}
                            getVerificationCode={getVerificationCode}
                            placeholder="验证码"
                            verifyPhoto={verifyPhoto}
                            vertifyDisable={isSendVerificationCodeDisable}
                        />
                    )}
                />
            </FormControl>
            <div className={style.aggrement}>
                <Aggrement />
            </div>
            <FormControl fullWidth>
                <SubmitButton disabled={isLoginDisable} label="登入" />
            </FormControl>
            <Button
                className={style.register}
                onClick={() => {
                    setAuthQuery('register');
                }}
            >
                立即注册
            </Button>
            <div className={style.footer}>
                <Button
                    className={style.forgotPass}
                    onClick={() => {
                        setAuthQuery('forgetPassword');
                    }}
                >
                    忘记密码
                </Button>
                <span className={style.delimiter} />
                <p>常見問題</p>
            </div>
        </form>
    );
}

export default Login;
