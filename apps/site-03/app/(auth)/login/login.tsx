'use client';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl } from '@mui/material';
import type { LoginRequest } from 'data-center';
import { login, getMemberInfo } from 'data-center';
import { useEffect, useState } from 'react';
import { initWebSocket, messageService, mqttService } from 'lib';
import {
    // VertifyCodeByImage,
    Agreement,
    SubmitButton,
    CountryCodeInput,
    PhoneNumberInput,
    PasswordInput,
    TokenInput
} from '@/app/(auth)/components/authComponent/authComponent';
import { useNotificationStore } from '@/store/notificationStore';
// import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import style from './login.module.scss';

const schema = yup.object().shape({
    mobileNumber: yup
        .string()
        .matches(/^[0-9]+$/)
        .required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/)
        .required(),
    verificationCode: yup.string().required(),
    countryCode: yup.string().required(),
    verifyToken: yup.string().required()
});

function Login() {
    const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
    // const updateUnreadMessageNotify = useMessageStore.getState().updateUnreadMessageNotify;
    // const unreadMessageNotify = useMessageStore.getState().unreadMessageNotify;

    const setToken = useUserStore.use.setToken();
    const setUserInfo = useUserStore.use.setUserInfo();
    const setIsLogin = useUserStore.use.setIsLogin();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    // const loginStore = useAuthStore.use.login();
    // const { verifyPhoto, setVerifyPhoto } = loginStore;
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const removeAuthQuery = useAuthStore.use.removeAuthQuery();

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            mobileNumber: '',
            password: '',
            verificationCode: '000000',
            countryCode: '+86',
            verifyToken: ''
        },
        mode: 'onChange'
    });

    const { countryCode, mobileNumber, password, verificationCode, verifyToken } = watch();

    const getUserInfo = async () => {
        const res = await getMemberInfo();
        if (res.success) {
            setUserInfo(res.data);
            mqttService.close();
            setTimeout(() => {
                mqttService.init({ memberId: res.data.uid });
            }, 400);
        }
    };

    // const getUnreadMessage = async () => {
    //     const res = await getUnreadMessage();
    //     if (res.success) {
    //         updateUnreadMessageNotify({
    //             ...unreadMessageNotify,
    //             mailCount: res.mailCount,
    //             totalCount: res.mailCount
    //         });
    //     }
    // };

    const onSubmit = async (data: LoginRequest) => {
        const res = await login(data);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '登录失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            _turnstileCb();
            return;
        }

        setIsDrawerOpen(false);
        setToken(res.data);
        setIsVisible('登入成功！', 'success');
        removeAuthQuery();
        setIsLogin(true);

        messageService.closeWS();
        setTimeout(() => {
            initWebSocket({
                url: process.env.NEXT_PUBLIC_MESSAGE_PATH || '',
                onOpen: () => {
                    void messageService.send({
                        action: 'init',
                        token: res.data
                    });
                }
            });
        }, 400);
        void getUserInfo();
        // void getUnreadMessage();
    };

    // const getCaptcha = async () => {
    //     const res = await getVerificationCaptcha();

    //     if (!res.success) {
    //         const errorMessage = res.error ? res.error : '取得验证图形失败';
    //         setIsVisible(errorMessage, 'error');
    //         return;
    //     }

    //     setVerifyPhoto(res.data.captcha);
    //     setValue('verifyToken', res.data.verifyToken);
    // };

    // useEffect(() => {
    //     void getCaptcha();
    // }, []);

    const _turnstileCb = () => {
        window.turnstile?.render('#myWidget', {
            sitekey: '0x4AAAAAAAXX3mVYJPj3EcnA',
            theme: 'light',
            callback(token) {
                setValue('verifyToken', token);
            }
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (window.turnstile) {
                clearInterval(intervalId);
                setIsTurnstileLoaded(true);
            }
        }, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (isTurnstileLoaded) {
            _turnstileCb();
        }
    }, [isTurnstileLoaded]);

    const isSendVerificationCodeDisable = !countryCode || !mobileNumber || !password;
    const isLoginDisable = isSendVerificationCodeDisable || !verificationCode || !verifyToken; //|| !verifyPhoto ;

    return (
        <div className={style.login}>
            <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
                {/* <FormControl fullWidth>
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
                                vertifyDisable={isSendVerificationCodeDisable}
                            />
                        )}
                    />
                </FormControl> */}
                <div id="myWidget" />
                <TokenInput verifyToken={verifyToken} />
                <div className={style.agreement}>
                    <Agreement />
                </div>
                <FormControl fullWidth>
                    <SubmitButton disabled={isLoginDisable} label="登入" />
                </FormControl>
            </form>
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
        </div>
    );
}

export default Login;
