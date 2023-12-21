import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl } from '@mui/material';
import type { ForgetPasswordRequest } from 'data-center';
import { forgetPasswordReset, sendVerificationCode } from 'data-center';
import { useNotificationStore } from '@/app/notificationStore';
import { useUserStore } from '@/app/userStore';
import {
    CountryCodeInput,
    PasswordInput,
    PhoneNumberInput,
    SubmitButton,
    VertifyCode
} from '../components/authComponent/authComponent';
import { useAuthStore } from '../authStore';
import style from './forgetPassword.module.scss';

const schema = yup.object().shape({
    countryCode: yup.string().required(),
    mobileNumber: yup
        .string()
        .matches(/^[0-9]+$/)
        .required(),
    verificationCode: yup.string().required(),
    newPassword: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/, '请输入6-16位英文+数字')
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], '请输入6-16位英文+数字')
        .required('请再次输入新密码')
});

function ForgetPassword() {
    const registerStore = useAuthStore.use.register();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const { sendCodeSuccess, setSendCodeSuccess, countDownNumber, setCountDownNumber } =
        registerStore;

    const { control, formState, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            mobileNumber: '',
            verificationCode: '',
            newPassword: '',
            confirmPassword: '',
            countryCode: '+86'
        }
    });
    const errors = formState.errors;

    const { countryCode, mobileNumber, newPassword, confirmPassword, verificationCode } = watch();

    const isSendVerificationCodeDisable = !countryCode || !mobileNumber;
    const isSubmitDisable =
        isSendVerificationCodeDisable || !verificationCode || !newPassword || !confirmPassword;

    const onSubmit = async (data: ForgetPasswordRequest) => {
        const res = await forgetPasswordReset(data);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '密码设定失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setIsVisible('密码设定成功！', 'success');
        setAuthQuery('login');
    };

    const getVerificationCode = async () => {
        const res = await sendVerificationCode({
            countryCode,
            mobileNumber,
            verificationType: 0,
            checkExistingAccount: false
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

    return (
        <form className={style.forgetPassword} onSubmit={handleSubmit(onSubmit)}>
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
                    name="newPassword"
                    render={({ field }) => (
                        <PasswordInput
                            error={errors.newPassword}
                            field={field}
                            id="newPassword"
                            placeholder="密码请输入6-16位英文+数字"
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
                            placeholder="请再次输入新密码"
                        />
                    )}
                />
            </FormControl>
            <FormControl className={style.submitButton} fullWidth>
                <SubmitButton disabled={isSubmitDisable} label="提交" />
            </FormControl>
        </form>
    );
}

export default ForgetPassword;
