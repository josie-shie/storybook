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

function HeaderLogo({ background = false }: { background?: boolean }) {
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
