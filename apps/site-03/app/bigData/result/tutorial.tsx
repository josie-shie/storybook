'use client';
import Image from 'next/image';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import type SwiperClass from 'swiper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import style from './dashboard.module.scss';
import handicapTopBar from './img/tutorial/handicapTopBar.png';
import handicapBottomTable from './img/tutorial/handicapBottomTable.png';
import handicapTop from './img/tutorial/handicapTop.png';
import handicapBottom from './img/tutorial/handicapBottom.png';
// import handicapTips from './img/tutorial/handicapTips.png';
import minutesTop from './img/tutorial/minutesTop.png';
import minutesChart from './img/tutorial/minutesChart.png';
import minutesBottom from './img/tutorial/minutesBottom.png';
import minutesBottomTable from './img/tutorial/minutesBottomTable.png';
import goalRangeTop from './img/tutorial/goalRangeTop.png';
import goalRangeTopChart from './img/tutorial/goalRangeTopChart.png';
import goalRangeBottom from './img/tutorial/goalRangeBottom.png';
import goalRangeBottomTable from './img/tutorial/goalRangeBottomTable.png';
import bodanTop from './img/tutorial/bodanTop.png';
import bodanTopTable from './img/tutorial/bodanTopTable.png';
import leftArrowIcon from './img/leftArrow.png';
import rightArrowIcon from './img/rightArrow.png';
import { useAnalyticsResultStore } from './analysisResultStore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

interface ImageType {
    height: number;
    src: string;
    width: number;
}

function TutorialSection({
    topImages,
    bottomImages,
    // extraBottomImage,
    showAnimation
}: {
    topImages: ImageType[];
    bottomImages?: ImageType[];
    // extraBottomImage?: ImageType;
    showAnimation: boolean;
}) {
    const fadeInOut = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <div className={style.images}>
            <div className={style.tutorialTop}>
                {topImages.map((img, index) => (
                    <Image alt="" key={`${index.toString()}`} {...img} />
                ))}
            </div>
            {bottomImages ? (
                <div className={style.tutorialBottom}>
                    {bottomImages.map((img, index) =>
                        showAnimation ? (
                            <motion.div
                                animate="visible"
                                exit="hidden"
                                initial="hidden"
                                key={`${index.toString()}`}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                variants={fadeInOut}
                            >
                                <Image alt="" {...img} />
                            </motion.div>
                        ) : (
                            <Image alt="" key={`${index.toString()}`} {...img} />
                        )
                    )}
                </div>
            ) : null}

            {/* {extraBottomImage ? (
                <motion.div
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    transition={{ duration: 0.5, delay: showAnimation ? 1.5 : 0 }}
                    variants={fadeInOut}
                >
                    <div className={style.tutorialBottom}>
                        <Image alt="" {...extraBottomImage} />
                    </div>
                </motion.div>
            ) : null} */}
        </div>
    );
}

function Bodan({ isShowed }: { isShowed: Record<number, number> }) {
    const topImages = [
        {
            className: `${style.highlightImage} ${isShowed[3] <= 1 && style.bodanAnimation}`,
            height: 35,
            src: bodanTopTable.src,
            width: 130,
            style: { top: '144px' }
        },
        { height: 246, src: bodanTop.src, width: 330 }
    ];

    return (
        <div className={style.centerImage}>
            <TutorialSection showAnimation={isShowed[3] <= 1} topImages={topImages} />;
        </div>
    );
}

function Range({ isShowed }: { isShowed: Record<number, number> }) {
    const topImages = [
        {
            className: `${style.highlightImage} ${isShowed[2] <= 1 && style.rangeAnimation}`,
            height: 199,
            src: goalRangeTopChart.src,
            width: 227
        },
        { height: 272, src: goalRangeTop.src, width: 330 }
    ];
    const bottomImages = [
        {
            className: `${style.highlightImage} ${isShowed[2] <= 1 && style.hightlightAnimation}`,
            height: 71,
            src: goalRangeBottomTable.src,
            width: 96
        },
        { height: 71, src: goalRangeBottom.src, width: 330 }
    ];

    return (
        <div className={style.centerImage}>
            <TutorialSection
                bottomImages={bottomImages}
                showAnimation={isShowed[2] <= 1}
                topImages={topImages}
            />
        </div>
    );
}

function Minutes({ isShowed }: { isShowed: Record<number, number> }) {
    const topImages = [
        {
            className: `${style.highlightImage} ${isShowed[1] <= 1 ? style.minutesAnimation : ''}`,
            height: 160,
            src: minutesChart.src,
            width: 134
        },
        { height: 290, src: minutesTop.src, width: 330 }
    ];
    const bottomImages = [
        {
            className: `${style.highlightImage} ${
                isShowed[1] <= 1 ? style.hightlightAnimation : ''
            }`,
            height: 110,
            src: minutesBottomTable.src,
            width: 130
        },
        { height: 110, src: minutesBottom.src, width: 330 }
    ];

    return (
        <div className={style.centerImage}>
            <TutorialSection
                bottomImages={bottomImages}
                showAnimation={isShowed[1] <= 1}
                topImages={topImages}
            />
        </div>
    );
}

function Handicap({ isShowed }: { isShowed: Record<number, number> }) {
    const topImages = [
        {
            className: `${style.highlightImage} ${isShowed[0] <= 0 && style.handicapAnimation}`,
            height: 277,
            src: handicapTopBar.src,
            width: 66
        },
        { height: 377, src: handicapTop.src, width: 330 }
    ];
    const bottomImages = [
        {
            className: `${style.highlightImage} ${isShowed[0] <= 0 && style.hightlightAnimation}`,
            height: 71,
            src: handicapBottomTable.src,
            width: 130
        },
        { height: 71, src: handicapBottom.src, width: 330 }
    ];
    // const extraBottomImage = { height: 98, src: handicapTips.src, width: 332 };

    return (
        <TutorialSection
            bottomImages={bottomImages}
            // extraBottomImage={extraBottomImage}
            showAnimation={isShowed[0] <= 0}
            topImages={topImages}
        />
    );
}

function Tutorial({ setDefaultPageIndex }: { setDefaultPageIndex: (val: number) => void }) {
    const [closeTutorial, setCloseTutorial] = useState(false);
    const [bottomText, setBottomText] = useState('跳过');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowed, setIsShowed] = useState<Record<number, number>>({
        0: 0,
        1: 0,
        2: 0,
        3: 0
    });

    const showedTutorial = useAnalyticsResultStore.use.showedTutorial();
    const setShowedTutorial = useAnalyticsResultStore.use.setShowedTutorial();

    const handleSlideChange = (swiper: SwiperClass) => {
        setCurrentIndex(swiper.activeIndex);
        setDefaultPageIndex(swiper.activeIndex);
        setIsShowed(prevState => {
            const currentCount = prevState[swiper.activeIndex] || 0;
            return {
                ...prevState,
                [swiper.activeIndex]: currentCount + 1
            };
        });

        if (swiper.activeIndex === 3) {
            setBottomText('关闭');
        } else {
            setBottomText('跳过');
        }
    };

    const handleClose = () => {
        setCloseTutorial(true);
        !showedTutorial && localStorage.setItem('showAnalysisTutorial', 'false');
        setDefaultPageIndex(0);
        setShowedTutorial(true);
    };

    useEffect(() => {
        setShowedTutorial(Boolean(localStorage.getItem('showAnalysisTutorial')));
    }, []);

    return (
        <div
            className={style.tutorial}
            style={{
                height: '100dvh',
                display: closeTutorial ? 'none' : '',
                position: 'relative'
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
                style={{ height: 'calc(100dvh - 30px)' }}
            >
                <SwiperSlide>
                    {/* 需要判斷index不然預設全部渲染就沒有動畫效果 */}
                    <div className={style.slide}>
                        {currentIndex === 0 && <Handicap isShowed={isShowed} />}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <div className={style.slide}>
                            {currentIndex === 1 && <Minutes isShowed={isShowed} />}
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <div className={style.slide}>
                            {currentIndex === 2 && <Range isShowed={isShowed} />}
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <div className={style.slide}>
                            {currentIndex === 3 && <Bodan isShowed={isShowed} />}
                        </div>
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
