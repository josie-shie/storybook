import { useState } from 'react';
import AuthDrawer from '../authDrawer/authDrawer';
import style from './changePassword.module.scss';

function ChangePassword() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const title = <p>修改密码</p>;

    return (
        <AuthDrawer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
            <div className={style.changePassword} />
        </AuthDrawer>
    );
}

export default ChangePassword;
