'use client';
import { useState } from 'react';
import { FormControl, Button } from '@mui/material';
import style from './login.module.scss';
import {
    AuthDrawer,
    PhoneInput,
    PasswordInput,
    VertifyCodeByImage,
    Aggrement,
    SubmitButton
} from '@/app/(auth)/components/authComponent/authComponent';

function Login() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const title = (
        <p className={style.futureTitle}>
            <span className={style.future}>未来</span>体育
        </p>
    );

    return (
        <AuthDrawer
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
            }}
            onOpen={() => {
                setIsOpen(true);
            }}
            title={title}
        >
            <div className={style.login}>
                <FormControl>
                    <PhoneInput />
                    <PasswordInput placeholder="6-16位英文+数字的密码">
                        <p className={style.forgotPass}>忘记密码</p>
                    </PasswordInput>

                    <VertifyCodeByImage />
                </FormControl>
                <Aggrement />
                <div className={style.buttons}>
                    <SubmitButton disabled label="登入" />
                    <Button className={style.registerButton} fullWidth>
                        立即注册
                    </Button>
                </div>
                <div className={style.footer}>
                    <p>常見問題</p>
                    <p>聯繫客服</p>
                </div>
            </div>
        </AuthDrawer>
    );
}

export default Login;
