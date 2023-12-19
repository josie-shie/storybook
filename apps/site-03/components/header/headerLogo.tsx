'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/userStore';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import logoIconImg from './img/logoIcon.png';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';
import Logo from './img/logo.png';

function HeaderLogo() {
    const userInfoIsLoading = useUserStore.use.userInfoIsLoading();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <Link className={style.logo} href="/">
                    <Image alt="" height={24} src={logoIconImg} width={24} />
                    <div className={style.icon}>
                        <Image alt="logo" src={Logo} width={66} />
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
