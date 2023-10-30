import type { ReactElement, ReactNode } from 'react';
import Image from 'next/image';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import logoIconImg from './img/logoIcon.png';

interface HeaderProps {
    logo?: ReactElement | string;
    children?: ReactNode;
}

function HeaderComponent({ logo, children }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <a href="/">
                    <div className={style.logo}>
                        <Image alt="" height={24} src={logoIconImg} width={24} />
                        <div className={style.icon}>{logo}</div>
                    </div>
                </a>
                {children}
            </div>
        </div>
    );
}

export default HeaderComponent;
