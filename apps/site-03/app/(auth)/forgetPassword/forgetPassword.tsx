import { useState } from 'react';
import style from './forgetPassword.module.scss';
import { AuthDrawer } from '@/app/(auth)/components/authComponent/authComponent';

function ForgetPassword() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const title = <p>忘记密码</p>;

    return (
        <AuthDrawer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
            <div className={style.forgetPassword} />
        </AuthDrawer>
    );
}

export default ForgetPassword;
