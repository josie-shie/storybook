import Image from 'next/image';
import { getRandomInt } from 'lib';
import { useEffect, useState, memo } from 'react';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import { useUserStore } from '@/app/userStore';
import style from './baseBanner.module.scss';
import GuessBannerImage from './img/guessBanner.png';
import RegisterBannerImage from './img/registerBanner.png';
import VipBannerImage from './img/vipBanner.png';

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
        2: StaticImageData;
        3?: StaticImageData;
    } = {
        1: {
            label: 'guessBanner',
            image: GuessBannerImage,
            link: '/guess'
        },
        2: {
            label: 'vipBanner',
            image: VipBannerImage,
            link: '/userInfo/subscribe'
        }
    };

    if (isLogin) {
        config[3] = {
            label: 'registerBanner',
            image: RegisterBannerImage,
            link: '/?auth=register'
        };
    }

    return config;
}

function BaseBanner() {
    const [isMounted, setIsMounted] = useState(false);
    const isLogin = useUserStore.use.isLogin();

    const randomImage = getRandomImageConfig(isLogin);
    const maxRandomNumber = isLogin ? 2 : 3;
    const randomNumberInit = getRandomInt(1, maxRandomNumber) as 1 | 2 | 3;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const randomMap = randomImage[randomNumberInit];

    return (
        <div className={style.baseBanner}>
            {isMounted ? (
                <Link href={randomMap?.link || defaultConfig.link}>
                    <Image
                        alt={randomMap?.label || defaultConfig.label}
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
