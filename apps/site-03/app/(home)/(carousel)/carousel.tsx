'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Keyboard, Pagination, Navigation, EffectCreative } from 'swiper';
import liveImg from './img/live.png';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import style from './carousel.module.scss';
import HomeTeamIcon from './img/homeTeam.png';
import AwayTeamIcon from './img/awayTeam.png';

interface Slide {
    id: number;
    image: string;
    leagueChs: string;
    homeIcon: string;
    awayIcon: string;
    homeChs: string;
    awayChs: string;
    homeScore: number;
    awayScore: number;
}

function LiveSlide({ slideInfo }: { slideInfo: Slide }) {
    return (
        <div className={style.slideImage} style={{ backgroundImage: `url(${slideInfo.image})` }}>
            <div className={style.contestInfo}>
                <div className={style.team}>
                    <div className={style.contestName}>{slideInfo.leagueChs}</div>
                    <div className={style.teamName}>
                        {slideInfo.homeChs} vs {slideInfo.awayChs}
                    </div>
                </div>
                <div className={style.score}>
                    <div className={style.teamScore}>
                        <Image alt="" height={20} src={slideInfo.homeIcon} width={20} />
                        <div className={style.scoreNumber}>{slideInfo.homeScore}</div>
                    </div>
                    <div className={style.teamScore}>
                        <Image alt="" height={20} src={slideInfo.awayIcon} width={20} />
                        <div className={style.scoreNumber}>{slideInfo.awayScore}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Carousel() {
    const slideList = [
        {
            id: 1,
            image: liveImg.src,
            leagueChs: '美国职业联赛',
            homeIcon: HomeTeamIcon.src,
            awayIcon: AwayTeamIcon.src,
            homeChs: '欧锦U20A',
            awayChs: '斯洛文尼亚U20',
            homeScore: 1,
            awayScore: 1
        },
        {
            id: 2,
            image: liveImg.src,
            leagueChs: '美国职业联赛',
            homeIcon: HomeTeamIcon.src,
            awayIcon: AwayTeamIcon.src,
            homeChs: '欧锦U20A',
            awayChs: '斯洛文尼亚U20',
            homeScore: 1,
            awayScore: 1
        },
        {
            id: 3,
            image: liveImg.src,
            leagueChs: '美国职业联赛',
            homeIcon: HomeTeamIcon.src,
            awayIcon: AwayTeamIcon.src,
            homeChs: '欧锦U20A',
            awayChs: '斯洛文尼亚U20',
            homeScore: 1,
            awayScore: 1
        }
    ];

    return (
        <div className={style.carousel}>
            <div className={style.title}>热门赛事直播</div>
            <div style={{ height: '238px', width: '100%' }}>
                <Swiper
                    className="mySwiper"
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
                        clickable: true
                    }}
                >
                    {slideList.map(slide => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <LiveSlide slideInfo={slide} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default Carousel;
