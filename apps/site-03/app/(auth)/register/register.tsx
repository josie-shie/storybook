'use client';
import { FormControl } from '@mui/material';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterRequest } from 'data-center';
import { sendVerificationSms, register } from 'data-center';
import { useSearchParams } from 'next/navigation';
import {
    PhoneNumberInput,
    VertifyCode,
    PasswordInput,
    Aggrement,
    SubmitButton,
    CountryCodeInput,
    TokenInput
} from '@/app/(auth)/components/authComponent/authComponent';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuthStore } from '@/store/authStore';
import style from './register.module.scss';

const schema = yup.object().shape({
    mobileNumber: yup.string().required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/)
        .required(),
    verificationCode: yup.string().required(),
    countryCode: yup.string().required(),
    verifyToken: yup.string().required()
});

function Register() {
    const setToken = useUserStore.use.setToken();
    const searchParams = useSearchParams();
    const inviteCode = searchParams.get('inviteCode');
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const registerStore = useAuthStore.use.register();
    const { sendCodeSuccess, setSendCodeSuccess, countDownNumber, setCountDownNumber } =
        registerStore;
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
            verificationCode: '',
            countryCode: '+86',
            verifyToken: ''
        },
        mode: 'onChange'
    });

    const { countryCode, mobileNumber, password, verificationCode, verifyToken } = watch();

    const getVerificationCode = async () => {
        const res = await sendVerificationSms({
            countryCode,
            mobileNumber,
            checkExistingAccount: true
        });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得验证码失败';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setSendCodeSuccess(true);
        setCountDown();
        setValue('verifyToken', res.data.verifyToken);
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
        const res = await register({
            ...data,
            ...(inviteCode && { invitationCode: inviteCode })
        });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '注册失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
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
        isSendVerificationCodeDisable || !verificationCode || !password || !verifyToken;

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
            <TokenInput verifyToken={verifyToken} />
            <Aggrement />
            <FormControl className={style.registerButton} fullWidth>
                <SubmitButton disabled={isRegisterDisable} label="注册" />
            </FormControl>
        </form>
    );
}

export default Register;
