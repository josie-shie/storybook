import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/app/userStore';
import style from './header.module.scss';
import backLeftArrowImg from './img/backLeftArrow.png';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';

interface HeaderProps {
    title: string;
    srcPath?: string;
    backHandler?: () => void;
}

function HeaderTransparent({ title, srcPath, backHandler }: HeaderProps) {
    const userInfoIsLoading = useUserStore.use.userInfoIsLoading();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [noBg, setNoBg] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

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
                    !noBg ? style.showBg : style.headerNoBg
                }`}
            >
                <div className={style.title}>
                    <Image
                        alt=""
                        height={24}
                        onClick={backHandler || goBack}
                        src={backLeftArrowImg}
                        width={24}
                    />
                    <div className={style.text}>{title}</div>
                </div>
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

export default HeaderTransparent;
