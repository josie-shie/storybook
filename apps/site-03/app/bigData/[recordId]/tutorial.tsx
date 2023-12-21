'use client';
import Image from 'next/image';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { useState } from 'react';
import { motion } from 'framer-motion';
import style from './dashboard.module.scss';
import backgroundImage from './img/tutorial/background.png';
import handicapTopBar from './img/tutorial/handicapTopBar.png';
import handicapBottomTable from './img/tutorial/handicapBottomTable.png';
import handicapTop from './img/tutorial/handicapTop.png';
import handicapBottom from './img/tutorial/handicapBottom.png';
import handicapTips from './img/tutorial/handicapTips.png';
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
    extraBottomImage
}: {
    topImages: ImageType[];
    bottomImages?: ImageType[];
    extraBottomImage?: ImageType;
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
                    {bottomImages.map((img, index) => (
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
                    ))}
                </div>
            ) : null}
            {extraBottomImage ? (
                <motion.div
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    transition={{ duration: 0.5, delay: 1.5 }}
                    variants={fadeInOut}
                >
                    <Image alt="" {...extraBottomImage} />
                </motion.div>
            ) : null}
        </div>
    );
}

function Bodan() {
    const topImages = [
        {
            className: `${style.highlightImage} ${style.bodanAnimation}`,
            height: 35,
            src: bodanTopTable.src,
            width: 130,
            style: { top: '144px' }
        },
        { height: 246, src: bodanTop.src, width: 330 }
    ];

    return <TutorialSection topImages={topImages} />;
}

function Range() {
    const topImages = [
        {
            className: `${style.highlightImage} ${style.rangeAnimation}`,
            height: 199,
            src: goalRangeTopChart.src,
            width: 227
        },
        { height: 272, src: goalRangeTop.src, width: 330 }
    ];
    const bottomImages = [
        { className: style.highlightImage, height: 71, src: goalRangeBottomTable.src, width: 96 },
        { height: 71, src: goalRangeBottom.src, width: 330 }
    ];

    return <TutorialSection bottomImages={bottomImages} topImages={topImages} />;
}

function Minutes() {
    const topImages = [
        {
            className: `${style.highlightImage} ${style.minutesAnimation}`,
            height: 160,
            src: minutesChart.src,
            width: 134
        },
        { height: 290, src: minutesTop.src, width: 330 }
    ];
    const bottomImages = [
        { className: style.highlightImage, height: 110, src: minutesBottomTable.src, width: 130 },
        { height: 110, src: minutesBottom.src, width: 330 }
    ];

    return <TutorialSection bottomImages={bottomImages} topImages={topImages} />;
}

function Handicap() {
    const topImages = [
        {
            className: `${style.highlightImage} ${style.handicapAnimation}`,
            height: 277,
            src: handicapTopBar.src,
            width: 66
        },
        { height: 377, src: handicapTop.src, width: 330 }
    ];
    const bottomImages = [
        { className: style.highlightImage, height: 71, src: handicapBottomTable.src, width: 130 },
        { height: 71, src: handicapBottom.src, width: 330 }
    ];
    const extraBottomImage = { height: 98, src: handicapTips.src, width: 332 };

    return (
        <TutorialSection
            bottomImages={bottomImages}
            extraBottomImage={extraBottomImage}
            topImages={topImages}
        />
    );
}

function Tutorial({ setDefaultPageIndex }: { setDefaultPageIndex: (val: number) => void }) {
    const [closeTutorial, setCloseTutorial] = useState(false);
    const [bottomText, setBottomText] = useState('跳过');
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlideChange = (swiper: SwiperClass) => {
        setCurrentIndex(swiper.activeIndex);
        setDefaultPageIndex(swiper.activeIndex);
        if (swiper.activeIndex === 3) {
            setBottomText('关闭');
        } else {
            setBottomText('跳过');
        }
    };

    const handleClose = () => {
        setCloseTutorial(true);
    };

    return (
        <div
            className={style.tutorial}
            style={{
                height: '100vh',
                backgroundImage: `url(${backgroundImage.src})`,
                display: closeTutorial ? 'none' : ''
            }}
        >
            <Swiper
                effect="fade"
                fadeEffect={{ crossFade: true }}
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                onSlideChange={handleSlideChange}
                pagination={{ clickable: true }}
                slidesPerView={1}
                style={{ height: 'calc(100vh - 100px)' }}
            >
                <SwiperSlide>
                    {/* 需要判斷index不然預設全部渲染就沒有動畫效果 */}
                    <div className={style.slide}>{currentIndex === 0 && <Handicap />}</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <div className={style.slide}>{currentIndex === 1 && <Minutes />}</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <div className={style.slide}>{currentIndex === 2 && <Range />}</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <div className={style.slide}>{currentIndex === 3 && <Bodan />}</div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className={style.bottomButton} onClick={handleClose}>
                {bottomText}
            </div>
        </div>
    );
}

export default Tutorial;
