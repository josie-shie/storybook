import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import type { ReactNode } from 'react';
import style from './authDrawer.module.scss';
import closeIcon from './img/closeIcon.png';
import headerBg from './img/headerBg.jpeg';

interface PropsType {
    title: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: ReactNode;
}

function AuthDrawer({ title, isOpen, setIsOpen, children }: PropsType) {
    return (
        <Drawer
            anchor="bottom"
            onClose={() => {
                setIsOpen(false);
            }}
            open={isOpen}
            sx={{
                '& .MuiPaper-root': {
                    height: '580px',
                    backgroundColor: '#1665df'
                }
            }}
        >
            <div className={style.loginDrawer}>
                <div className={style.header} style={{ backgroundImage: `url(${headerBg.src})` }}>
                    <p className={style.title}>{title}</p>
                    <Image
                        alt=""
                        className={style.closeBtn}
                        height={16}
                        src={closeIcon.src}
                        width={16}
                    />
                    {children}
                </div>
            </div>
        </Drawer>
    );
}

export default AuthDrawer;
