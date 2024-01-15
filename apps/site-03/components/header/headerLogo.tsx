'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIconImg from './img/logoIcon.svg';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';
import Logo from './img/logo.svg';

function HeaderLogo({
    title,
    link = '/',
    background = false
}: {
    title?: string;
    link?: string;
    background?: boolean;
}) {
    const userInfoIsLoading = useUserStore.use.userInfoIsLoading();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const headerStyle = background
        ? {
              background: 'linear-gradient(to right, #2c5eb2 0%, #3a82fb 100%)'
          }
        : {
              backgroundImage: `url(${dotBackground.src})`
          };

    return (
        <div className={style.placeholder}>
            <div className={style.header} style={headerStyle}>
                <Link className={style.logo} href={link}>
                    <LogoIconImg />
                    <div className={style.icon}>
                        {title ? <div className={style.titleText}>{title}</div> : <Logo />}
                    </div>
                </Link>
                {mounted && !userInfoIsLoading ? (
                    <div className={style.userOption}>
                        <Notice />
                        <Profile />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default HeaderLogo;
