import Image from 'next/image';
import { memo } from 'react';
import Link from 'next/link';
import type { BannerInfo } from 'data-center';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper';
import style from './baseBanner.module.scss';

function SwiperBanner({ bannerList }: { bannerList: BannerInfo[] }) {
    const displayBanner = bannerList.filter((banner: BannerInfo) => banner.isActive);
    return (
        <Swiper
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
            navigation={{
                prevEl: '.navigation-prev',
                nextEl: '.navigation-next'
            }}
            slidesPerView={1}
        >
            {displayBanner.map((banner: BannerInfo) => (
                <SwiperSlide key={banner.id}>
                    <Link className={style.banner} href={banner.link} suppressHydrationWarning>
                        <Image
                            alt={banner.title}
                            height={30}
                            priority
                            src={banner.imgPath}
                            suppressHydrationWarning
                            width={200}
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
            {bannerList.length ? <SwiperBanner bannerList={bannerList} /> : null}
        </div>
    );
}

export default memo(BaseBanner);
