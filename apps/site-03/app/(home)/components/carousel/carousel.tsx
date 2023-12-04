'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Keyboard, Pagination, Navigation, EffectCreative } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { timestampToMonthDay } from 'lib';
import type { GetHomepageBannerMatch, GetHomepageBannerBanner } from 'data-center';
import { useHomeStore } from '../../homeStore';
import style from './carousel.module.scss';
import liveImg from '@/app/(home)/img/live.png';
import { useContestInfoStore } from '@/app/contestInfoStore';

interface GlobalMatch {
    homeScore: number | undefined;
    awayScore: number | undefined;
    startTime: number | undefined;
}

function BannerSlide({ slideInfo }: { slideInfo: GetHomepageBannerBanner }) {
    return (
        <div
            className={style.slideImage}
            style={{ backgroundImage: `url(${slideInfo.imgPath})` }}
        />
    );
}

function LiveSlide({
    slideInfo,
    globalMatchDetail
}: {
    slideInfo: GetHomepageBannerMatch;
    globalMatchDetail: GlobalMatch;
}) {
    return (
        <div className={style.slideImage} style={{ backgroundImage: `url(${liveImg.src})` }}>
            <div className={style.detail}>
                {slideInfo.leagueChsShort} 分组赛{slideInfo.roundCn}轮 今天
                {timestampToMonthDay(globalMatchDetail.startTime || slideInfo.startTime)}
            </div>
            <div className={style.middleTeamIcon}>
                <Image alt="" height={54} src={slideInfo.homeLogo} width={54} />
                <div className={style.verse}>VS</div>
                <Image alt="" height={54} src={slideInfo.awayLogo} width={54} />
            </div>
            <div className={style.contestInfo}>
                <div className={style.team}>
                    <div className={style.contestName}>{slideInfo.leagueChsShort}</div>
                    <div className={style.teamName}>
                        {slideInfo.homeChs} vs {slideInfo.awayChs}
                    </div>
                </div>
                <div className={style.score}>
                    <div className={style.teamScore}>
                        <Image alt="" height={20} src={slideInfo.homeLogo} width={20} />
                        <div className={style.scoreNumber}>
                            {globalMatchDetail.homeScore || slideInfo.homeScore}
                        </div>
                    </div>
                    <div className={style.teamScore}>
                        <Image alt="" height={20} src={slideInfo.awayLogo} width={20} />
                        <div className={style.scoreNumber}>
                            {globalMatchDetail.awayScore || slideInfo.awayScore}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Carousel() {
    const slideList = useHomeStore.use.slideList();
    const bannerList = useHomeStore.use.bannerList();
    const globalStore = useContestInfoStore.use.contestInfo();

    return (
        <div className={style.carousel}>
            <div className={style.title}>热门赛事直播</div>
            <div style={{ height: '238px', width: '100%' }}>
                <Swiper
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400]
                        },
                        next: {
                            translate: ['100%', 0, 0]
                        }
                    }}
                    effect="creative"
                    grabCursor
                    keyboard={{
                        enabled: true
                    }}
                    modules={[EffectCreative, Keyboard, Pagination, Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true
                    }}
                >
                    {slideList.map(slide => {
                        return (
                            <SwiperSlide key={slide.matchId}>
                                <LiveSlide
                                    globalMatchDetail={{
                                        homeScore: globalStore[slide.matchId].homeScore,
                                        awayScore: globalStore[slide.matchId].awayScore,
                                        startTime: globalStore[slide.matchId].startTime
                                    }}
                                    slideInfo={slide}
                                />
                            </SwiperSlide>
                        );
                    })}
                    {bannerList.map((slide, idx) => {
                        return (
                            <SwiperSlide key={`indexBanner_${idx.toString()}`}>
                                <BannerSlide slideInfo={slide} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default Carousel;
