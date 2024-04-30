'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { appStateStore } from '@/store/appStateStore';
import style from './header.module.scss';
import LogoIconImg from './img/logoIcon.svg';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';
import Logo from './img/logo.svg';
import backLeftArrowImg from './img/backLeftArrow.png';

function HeaderLogo({
    title,
    link = '/',
    children,
    back = false,
    onClickBack
}: {
    title?: string;
    link?: string;
    children?: ReactNode;
    back?: boolean;
    onClickBack?: () => void;
}) {
    const isClientSide = appStateStore.use.isClientSide();

    useEffect(() => {
        const setIsClientSide = appStateStore.getState().setIsClientSide;
        if (!isClientSide) {
            setIsClientSide(true);
        }
    }, [isClientSide]);

    const handleClickBack = () => {
        if (onClickBack) onClickBack();
    };

    return (
        <div className={style.placeholder}>
            <div className={`${style.header} ${style.headerTransparent}`}>
                <Link
                    aria-label="智球网"
                    className={style.logo}
                    href={link}
                    onClick={handleClickBack}
                >
                    {back ? (
                        <Image alt="" height={24} src={backLeftArrowImg} width={24} />
                    ) : (
                        <LogoIconImg />
                    )}

                    <div className={style.icon}>
                        {title ? <div className={style.titleText}>{title}</div> : <Logo />}
                    </div>
                </Link>
                {isClientSide
                    ? children || (
                          <div className={style.userOption}>
                              <Notice />
                              <Profile />
                          </div>
                      )
                    : null}
            </div>
        </div>
    );
}

export default HeaderLogo;
