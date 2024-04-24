'use client';
import { FormControl } from '@mui/material';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterRequest } from 'data-center';
import { getRandomUserName, register } from 'data-center';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    PhoneNumberInput,
    NicknameInput,
    PasswordInput,
    Agreement,
    SubmitButton,
    CountryCodeInput,
    // VertifyCodeByImage,
    TokenInput
} from '@/app/(auth)/components/authComponent/authComponent';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuthStore } from '@/store/authStore';
import style from './register.module.scss';

interface TurnstileMethods {
    render: (
        selector: string,
        options: { sitekey: string; theme: string; callback: (token: string) => void }
    ) => void;
}

declare global {
    interface Window {
        turnstile?: TurnstileMethods;
    }
}

const schema = yup.object().shape({
    mobileNumber: yup
        .string()
        .matches(/^\d{10,11}$/, '手機號碼格式錯誤')
        .required(),
    userName: yup
        .string()
        .matches(/^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/, '暱稱格式錯誤')
        .required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/, '密碼格式錯誤')
        .required(),
    countryCode: yup.string().required(),
    verifyToken: yup.string().required(),
    verificationCode: yup.string().required()
});

function Register() {
    const setToken = useUserStore.use.setToken();
    const searchParams = useSearchParams();
    const inviteCode = searchParams.get('inviteCode');
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const removeAuthQuery = useAuthStore.use.removeAuthQuery();
    const [isRotating, setIsRotating] = useState(false);
    const [randomUserNameList, setRandomUserNameList] = useState<string[]>([]);
    const [randomUserNameIdx, setRandomUserNameIdx] = useState<number>(0);
    const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
    // const registerStore = useAuthStore.use.register();
    // const { verifyPhoto, setVerifyPhoto } = registerStore;

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            mobileNumber: '',
            userName: '',
            password: '',
            countryCode: '+86',
            verifyToken: '',
            verificationCode: '000000'
        },
        mode: 'onChange'
    });

    const { countryCode, mobileNumber, password, userName, verifyToken, verificationCode } =
        watch();

    const changeRandomUsername = async () => {
        setIsRotating(true);
        if (randomUserNameList.length && randomUserNameIdx < randomUserNameList.length - 1) {
            const newIndex = randomUserNameIdx + 1;
            setValue('userName', randomUserNameList[newIndex]);
            setRandomUserNameIdx(newIndex);
        } else {
            const res = await getRandomUserName({ quantity: 100 });
            if (!res.success) throw Error();
            setValue('userName', res.data.userName[0]);
            setRandomUserNameList(res.data.userName);
            setRandomUserNameIdx(0);
        }
        setTimeout(() => {
            setIsRotating(false);
        }, 1000);
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

    // const setCountDown = () => {
    //     let currentSeconds = countDownNumber;

    //     const interval = setInterval(() => {
    //         currentSeconds = currentSeconds === 0 ? 60 : currentSeconds - 1;
    //         setCountDownNumber(currentSeconds);

    //         if (currentSeconds === 0) {
    //             clearInterval(interval);
    //             setSendCodeSuccess(false);
    //         }
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //         setSendCodeSuccess(false);
    //         setCountDownNumber(60);
    //     };
    // };

    const onSubmit = async (data: RegisterRequest) => {
        const res = await register({
            ...data,
            ...(inviteCode && { invitationCode: inviteCode })
        });

        if (!res.success) {
            if (!res.error) {
                return '注册失败，请确认资料无误';
            }
            if (res.error.includes('手机号码')) {
                setError('mobileNumber', { type: 'duplicate', message: res.error });
                return;
            } else if (res.error.includes('昵称')) {
                setError('userName', { type: 'duplicate', message: res.error });
                return;
            }
            setIsVisible(res.error, 'error');
            return;
        }

        setIsDrawerOpen(false);
        setToken(res.data);
        setIsVisible('注册成功！', 'success');
        removeAuthQuery();
        location.reload();
    };

    const isSendVerificationCodeDisable = !countryCode || !mobileNumber;
    const isRegisterDisable =
        isSendVerificationCodeDisable ||
        !password ||
        !userName ||
        !verificationCode ||
        !verifyToken; // || !verifyPhoto;

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

    return (
        <form className={style.register} onSubmit={handleSubmit(onSubmit)}>
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
                    <div className={style.errorMessage}>! {errors.mobileNumber.message}</div>
                ) : null}
            </div>
            {/* <FormControl fullWidth>
                <Controller
                    control={control}
                    name="verificationCode"
                    render={({ field }) => (
                        <VertifyCode
                            countDownNumber={countDownNumber}
                            error={errors.verificationCode}
                            field={field}
                            getVerificationCode={getVerificationCode}
                            sendCodeSuccess={sendCodeSuccess}
                            vertifyDisable={isSendVerificationCodeDisable}
                        />
                    )}
                />
            </FormControl> */}
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="userName"
                    render={({ field }) => (
                        <NicknameInput
                            changeRandomUsername={changeRandomUsername}
                            error={errors.userName}
                            field={field}
                            isRotating={isRotating}
                            isShowDice
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
            <Agreement />
            <FormControl className={style.registerButton} fullWidth>
                <SubmitButton disabled={isRegisterDisable} label="注册" />
            </FormControl>
        </form>
    );
}

export default Register;
