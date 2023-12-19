import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl } from '@mui/material';
import type { UpdatePasswordRequest } from 'data-center';
import { sendVerificationCodeInLogged, updatePassword } from 'data-center';
import { useNotificationStore } from '@/app/notificationStore';
import {
    PasswordInput,
    SubmitButton,
    VertifyCode
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
        .required('確認密碼為必填欄位')
});

function ChangePassword() {
    const changePasswordStore = useAuthStore.use.changePassword();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const { sendCodeSuccess, setSendCodeSuccess, countDownNumber, setCountDownNumber } =
        changePasswordStore;

    const { control, formState, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            verificationCode: '',
            password: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const errors = formState.errors;

    const { verificationCode, password, newPassword, confirmPassword } = watch();

    const isSubmitDisable = !verificationCode || !password || !newPassword || !confirmPassword;

    const onSubmit = async (data: UpdatePasswordRequest) => {
        const res = await updatePassword(data);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '修改密码失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            return;
        }

        setIsDrawerOpen(false);
        setIsVisible('修改密码成功！', 'success');
    };

    const getVerificationCode = async () => {
        const res = await sendVerificationCodeInLogged({
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
        <form className={style.changePassword} onSubmit={handleSubmit(onSubmit)}>
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

export default ChangePassword;
