import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import logoIconImg from './img/logoIcon.png';
import Logo from './img/logo.png';

interface HeaderProps {
    children?: ReactNode;
}

function HeaderComponent({ children }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <Link className={style.logo} href="/">
                    <Image alt="" height={24} src={logoIconImg} width={24} />
                    <div className={style.icon}>
                        <Image alt="logo" src={Logo} width={66} />
                    </div>
                </Link>

                {children}
            </div>
        </div>
    );
}

export default HeaderComponent;
