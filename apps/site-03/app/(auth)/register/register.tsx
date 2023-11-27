'use client';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import style from './register.module.scss';
import {
    AuthDrawer,
    NicknameInput,
    PhoneInput,
    VertifyCode,
    PasswordInput
} from '@/app/(auth)/components/authComponent/authComponent';

function Register() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const title = <p>注册</p>;

    return (
        <AuthDrawer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
            <div className={style.register}>
                <FormControl>
                    <PhoneInput />
                    <VertifyCode />
                    <NicknameInput />
                    <PasswordInput placeholder="密码请输入6-16位英文+数字" />
                </FormControl>
            </div>
        </AuthDrawer>
    );
}

export default Register;
