import Image from 'next/image';
import { getRandomInt } from 'lib';
import { memo } from 'react';
import Link from 'next/link';
import type { BannerInfo } from 'data-center';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { useUserStore } from '@/store/userStore';
import style from './baseBanner.module.scss';
import GuessBannerImage from './img/guessBanner.jpg';
import RegisterBannerImage from './img/registerBanner.jpg';

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

function DefaultBanner() {
    const isLogin = useUserStore.use.isLogin();

    const randomImage = getRandomImageConfig(isLogin);
    const maxRandomNumber = isLogin ? 1 : 2;
    const randomNumberInit = getRandomInt(1, maxRandomNumber) as 1 | 2;

    const randomMap = randomImage[randomNumberInit];

    return (
        <Link
            className={style.banner}
            href={randomMap?.link || defaultConfig.link}
            suppressHydrationWarning
        >
            <Image
                alt={randomMap?.label || defaultConfig.label}
                priority
                src={randomMap?.image || defaultConfig.image}
                suppressHydrationWarning
            />
        </Link>
    );
}

function SwiperBanner({ bannerList }: { bannerList: BannerInfo[] }) {
    const displayBanner = bannerList.filter((banner: BannerInfo) => banner.isActive);
    return (
        <Swiper
            effect="fade"
            fadeEffect={{ crossFade: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            slidesPerView={1}
        >
            {displayBanner.map((banner: BannerInfo) => (
                <SwiperSlide key={banner.id}>
                    <Link className={style.banner} href={banner.link} suppressHydrationWarning>
                        <Image
                            alt={banner.title}
                            priority
                            src={banner.imgPath}
                            suppressHydrationWarning
                        />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

interface BaseBannerProps {
    className: string;
    bannerList: BannerInfo[];
}

function BaseBanner({ className, bannerList }: BaseBannerProps) {
    return (
        <div className={`${style.baseBanner} ${className}`}>
            {bannerList.length ? <SwiperBanner bannerList={bannerList} /> : <DefaultBanner />}
        </div>
    );
}

export default memo(BaseBanner);
