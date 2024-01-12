import type { ReactNode } from 'react';
import Link from 'next/link';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIconImg from './img/logoIcon.svg';
import Logo from './img/logo.svg';

interface HeaderProps {
    children?: ReactNode;
}

function HeaderComponent({ children }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <Link className={style.logo} href="/">
                    <LogoIconImg />
                    <div className={style.icon}>
                        <Logo />
                    </div>
                </Link>

                {children}
            </div>
        </div>
    );
}

export default HeaderComponent;
