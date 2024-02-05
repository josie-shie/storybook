import Image from 'next/image';
import { getRandomInt } from 'lib';
import { useEffect, useState, memo } from 'react';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import { useUserStore } from '@/store/userStore';
import style from './baseBanner.module.scss';
import GuessBannerImage from './img/guessBanner.png';
import RegisterBannerImage from './img/registerBanner.png';

const defaultConfig = {
    label: 'guessBanner',
    image: GuessBannerImage,
    link: '/guess'
};

interface StaticImageData {
    label: string;
    image: typeof GuessBannerImage;
    link: string;
}

function getRandomImageConfig(isLogin: boolean) {
    const config: {
        1: StaticImageData;
        2?: StaticImageData;
    } = {
        1: {
            label: 'guessBanner',
            image: GuessBannerImage,
            link: '/guess'
        }
    };

    if (!isLogin) {
        config[2] = {
            label: 'registerBanner',
            image: RegisterBannerImage,
            link: '/?auth=register'
        };
    }

    return config;
}

function BaseBanner({ className }: { className: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const isLogin = useUserStore.use.isLogin();

    const randomImage = getRandomImageConfig(isLogin);
    const maxRandomNumber = isLogin ? 1 : 2;
    const randomNumberInit = getRandomInt(1, maxRandomNumber) as 1 | 2;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const randomMap = randomImage[randomNumberInit];

    return (
        <div className={`${style.baseBanner} ${className}`}>
            {isMounted ? (
                <Link className={style.banner} href={randomMap?.link || defaultConfig.link}>
                    <Image
                        alt={randomMap?.label || defaultConfig.label}
                        priority
                        src={randomMap?.image || defaultConfig.image}
                    />
                </Link>
            ) : (
                <Skeleton animation="wave" height="100%" variant="rectangular" width="100%" />
            )}
        </div>
    );
}

export default memo(BaseBanner);
