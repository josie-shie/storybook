import { useState } from 'react';
import style from './changePassword.module.scss';
import { AuthDrawer } from '@/app/(auth)/components/authComponent/authComponent';

function ChangePassword() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const title = <p>修改密码</p>;

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
            <div className={style.changePassword} />
        </AuthDrawer>
    );
}

export default ChangePassword;
