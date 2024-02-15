'use client';
import Image from 'next/image';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import type SwiperClass from 'swiper';
import { useEffect, useState } from 'react';
import { useQueryFormStore } from '@/app/aiBigData/queryFormStore';
import style from './tutorial.module.scss';
import leftArrowIcon from './img/leftArrow.png';
import rightArrowIcon from './img/rightArrow.png';
import fixedBgImage from './img/fixedBg.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import HandicapFirst from './handicapFirst';
import Handicap from './handicap';
import Minutes from './minutes';
import Bodan from './bodan';

function Tutorial({
    setDefaultPageIndex,
    playTutorial,
    setPlayTutorial
}: {
    setDefaultPageIndex?: (val: number) => void;
    playTutorial: boolean;
    setPlayTutorial: (playTutial: boolean) => void;
}) {
    const [bottomText, setBottomText] = useState('跳过');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowed, setIsShowed] = useState<Record<number, number>>({
        0: 0,
        1: 0,
        2: 0,
        3: 0
    });

    const showedTutorial = useQueryFormStore.use.showedTutorial();
    const setShowedTutorial = useQueryFormStore.use.setShowedTutorial();

    const handleSlideChange = (swiper: SwiperClass) => {
        setCurrentIndex(swiper.activeIndex);
        if (swiper.activeIndex < 2) {
            setDefaultPageIndex && setDefaultPageIndex(0);
        } else {
            setDefaultPageIndex && setDefaultPageIndex(swiper.activeIndex - 1);
            setIsShowed(prevState => {
                const currentCount = prevState[swiper.activeIndex] || 0;
                return {
                    ...prevState,
                    [swiper.activeIndex]: currentCount + 1
                };
            });
        }

        if (swiper.activeIndex === 3) {
            setBottomText('关闭');
        } else {
            setBottomText('跳过');
        }
    };

    const handleClose = () => {
        setPlayTutorial(false);
        !showedTutorial && localStorage.setItem('showAnalysisTutorial', 'false');
        setDefaultPageIndex && setDefaultPageIndex(0);
        setShowedTutorial(true);
    };

    useEffect(() => {
        setShowedTutorial(Boolean(localStorage.getItem('showAnalysisTutorial')));
    }, []);

    return (
        <div
            className={style.tutorial}
            style={{
                backgroundImage: setDefaultPageIndex ? 'none' : `url(${fixedBgImage.src})`,
                display: !playTutorial ? 'none' : '',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Swiper
                effect="fade"
                fadeEffect={{ crossFade: true }}
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                navigation={{
                    prevEl: '.navigation-prev',
                    nextEl: '.navigation-next'
                }}
                onSlideChange={handleSlideChange}
                pagination={{ clickable: true }}
                slidesPerView={1}
            >
                <SwiperSlide>
                    {/* 需要判斷index不然預設全部渲染就沒有動畫效果 */}
                    <div className={style.slide}>
                        {currentIndex === 0 && <HandicapFirst isShowed={isShowed} />}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        {currentIndex === 1 && <Handicap isShowed={isShowed} />}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        {currentIndex === 2 && <Minutes isShowed={isShowed} />}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        {currentIndex === 3 && <Bodan isShowed={isShowed} />}
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className={style.navigationButtons}>
                <button
                    className="navigation-prev"
                    // 如果直接讓它消失的話，再出現時功能會失效
                    style={{ visibility: currentIndex !== 0 ? 'visible' : 'hidden' }}
                    type="button"
                >
                    <Image alt="" height={14} src={leftArrowIcon.src} width={14} />
                </button>
                <button
                    className="navigation-next"
                    style={{ visibility: currentIndex !== 3 ? 'visible' : 'hidden' }}
                    type="button"
                >
                    <Image alt="" height={14} src={rightArrowIcon.src} width={14} />
                </button>
            </div>
            <div className={style.bottomButton} onClick={handleClose}>
                {bottomText}
            </div>
        </div>
    );
}

export default Tutorial;
