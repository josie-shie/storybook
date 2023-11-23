import { useState } from 'react';
import AuthDrawer from '../authDrawer/authDrawer';
import style from './forgetPassword.module.scss';

function Register() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const title = <p>注册</p>;

    return (
        <AuthDrawer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
            <div className={style.register} />
        </AuthDrawer>
    );
}

export default Register;
