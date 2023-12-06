'use client';
import { FormControl } from '@mui/material';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterRequest } from 'data-center';
import { sendVerificationCode, register } from 'data-center';
import { useAuthStore } from '../authStore';
import style from './register.module.scss';
import {
    NicknameInput,
    PhoneNumberInput,
    VertifyCode,
    PasswordInput,
    Aggrement,
    SubmitButton,
    CountryCodeInput
} from '@/app/(auth)/components/authComponent/authComponent';
import { useUserStore } from '@/app/userStore';
import { useNotificationStore } from '@/app/notificationStore';

const schema = yup.object().shape({
    mobileNumber: yup.string().required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/)
        .required(),
    verificationCode: yup.string().required(),
    countryCode: yup.string().required(),
    username: yup
        .string()
        .matches(/^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/)
        .required()
});

function Register() {
    const setToken = useUserStore.use.setToken();
    // const inviteCode = useUserStore.use.inviteCode(); // 邀請碼等api添加邀請碼欄位在使用
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const registerStore = useAuthStore.use.register();
    const { sendCodeSuccess, setSendCodeSuccess, countDownNumber, setCountDownNumber } =
        registerStore;
    const removeAuthQuery = useAuthStore.use.removeAuthQuery();
    const removeInvitCode = useAuthStore.use.removeInvitCode();

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
            countryCode: '+86',
            username: ''
        }
    });

    const { countryCode, mobileNumber, password, verificationCode, username } = watch();

    const getVerificationCode = async () => {
        const res = await sendVerificationCode({
            countryCode,
            mobileNumber,
            verificationType: 0,
            checkExistingAccount: true
        });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得验证码失败';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setSendCodeSuccess(true);
        setCountDown();
    };

    const setCountDown = () => {
        let currentSeconds = countDownNumber;

        const interval = setInterval(() => {
            currentSeconds = currentSeconds === 0 ? 60 : currentSeconds - 1;
            setCountDownNumber(currentSeconds);

            if (currentSeconds === 0) {
                clearInterval(interval);
                setSendCodeSuccess(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            setSendCodeSuccess(false);
            setCountDownNumber(60);
        };
    };

    const onSubmit = async (data: RegisterRequest) => {
        const res = await register(data);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '注册失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setIsDrawerOpen(false);
        setToken(res.data);
        setIsVisible('注册成功！', 'success');
        removeAuthQuery();
        removeInvitCode();
    };

    const isSendVerificationCodeDisable = !countryCode || !mobileNumber;
    const isRegisterDisable =
        isSendVerificationCodeDisable || !verificationCode || !username || !password;

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
                    <div className={style.errorMessage}>请输入手机号码</div>
                ) : null}
            </div>
            <FormControl fullWidth>
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
            </FormControl>
            <FormControl fullWidth>
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => <NicknameInput error={errors.username} field={field} />}
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
                            placeholder="密码请输入6-16位英文+数字"
                        />
                    )}
                />
            </FormControl>

            <Aggrement />
            <FormControl fullWidth>
                <SubmitButton disabled={isRegisterDisable} label="注册" />
            </FormControl>
        </form>
    );
}

export default Register;
