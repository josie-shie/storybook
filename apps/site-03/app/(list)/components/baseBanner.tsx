import Image from 'next/image';
import { getRandomInt } from 'lib';
import { useEffect, useState, memo } from 'react';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import style from './baseBanner.module.scss';
import GuessBannerImage from './img/guessBanner.png';
import RegisterBannerImage from './img/registerBanner.png';
import VipBannerImage from './img/vipBanner.png';

const RandomImage = {
    1: {
        label: 'guessBanner',
        image: GuessBannerImage,
        link: '/recommend/guess'
    },
    2: {
        label: 'registerBanner',
        image: RegisterBannerImage,
        link: '/?auth=register'
    },
    3: {
        label: 'vipBanner',
        image: VipBannerImage,
        link: '/userInfo/subscribe'
    }
};

type RandomNumber = 1 | 2 | 3;

function BaseBanner() {
    const randomNumberInit = getRandomInt(1, 3) as RandomNumber;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={style.baseBanner}>
            {isMounted ? (
                <Link href={RandomImage[randomNumberInit].link}>
                    <Image
                        alt={RandomImage[randomNumberInit].label}
                        src={RandomImage[randomNumberInit].image}
                    />
                </Link>
            ) : (
                <Skeleton animation="wave" height="100%" variant="rectangular" width="100%" />
            )}
        </div>
    );
}

export default memo(BaseBanner);
