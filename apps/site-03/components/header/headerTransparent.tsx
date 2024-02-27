import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { appStateStore } from '@/store/appStateStore';
import style from './header.module.scss';
import backLeftArrowImg from './img/backLeftArrow.png';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';
import LogoIcon from './img/logoIcon.svg';
import Logo from './img/logo.svg';

interface HeaderProps {
    title?: string;
    srcPath?: string;
    backHandler?: () => void;
    children?: ReactNode;
    back?: boolean;
}

function HeaderTransparent({ title, srcPath, backHandler, children, back = true }: HeaderProps) {
    const router = useRouter();
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [noBg, setNoBg] = useState(true);
    const isClientSide = appStateStore.use.isClientSide();

    useEffect(() => {
        const setIsClientSide = appStateStore.getState().setIsClientSide;
        if (!isClientSide) {
            setIsClientSide(true);
        }
    }, [isClientSide]);

    const goBack = () => {
        if (srcPath) {
            router.push(srcPath);
        } else {
            router.back();
        }
    };

    useEffect(() => {
        const currentRef = headerRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setNoBg(entry.isIntersecting);
            },
            {
                threshold: 0.3
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [setNoBg]);

    return (
        <div className={style.placeholder} ref={headerRef}>
            <div
                className={`${style.header} ${style.headerTransparent} ${
                    noBg ? style.headerNoBg : style.showBg
                }`}
            >
                <div className={style.title}>
                    {back ? (
                        <Image
                            alt=""
                            height={24}
                            onClick={backHandler || goBack}
                            src={backLeftArrowImg}
                            width={24}
                        />
                    ) : (
                        <LogoIcon />
                    )}

                    {title ? <div className={style.text}>{title}</div> : <Logo />}
                </div>
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

export default HeaderTransparent;
