import type { ReactElement, ReactNode } from 'react';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIcon from './img/logoIcon.svg';

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
                        <LogoIcon />
                        {logo}
                    </div>
                </a>
                {children}
            </div>
        </div>
    );
}

export default HeaderComponent;
