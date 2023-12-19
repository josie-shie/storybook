'use client';
import type { ReactNode } from 'react';
import { useState, Children, useRef, useEffect } from 'react';
import { Swiper as SwiperClass, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import ButtonBase from '@mui/material/ButtonBase';
import style from './slick.module.scss';

type Styling = 'text' | 'underline' | 'button';
type TabsType = { label: string; href: string; status: string | null }[];
interface SlickProps {
    tabs: TabsType;
    children: ReactNode;
    styling?: Styling;
    initialSlide?: number;
    className?: string;
}
interface SwiperExpansion extends Swiper {
    maxTranslate: () => number;
}

function SlickNav({
    tabWidth,
    activeIndex,
    styling,
    tabs,
    swipeTo,
    direction
}: {
    tabWidth: number;
    activeIndex: number;
    styling: Styling;
    tabs: TabsType;
    swipeTo: (index: number) => void;
    direction: string;
}) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const activeStatus =
        direction === 'next' ? Math.floor(activeIndex) + 1 : Math.floor(activeIndex);

    return (
        <div className={`ui-slick-tabs-container ${style.tabsContainer} ${style[styling]}`}>
            <div
                className={style.slick}
                style={{
                    width: `${tabWidth}%`,
                    transform: `translateX(${activeIndex * 100}%)`
                }}
            />
            <ul className={`ui-slick-tabs ${style.tabs}`}>
                {tabs.map((item, index) => {
                    return (
                        <li className="ui-slick-li" key={item.label}>
                            {isMounted ? (
                                <ButtonBase
                                    className={`ui-slick-button ${style.tabButton} ${
                                        activeStatus === index ? style.selected : ''
                                    } ${
                                        (activeIndex < 0 && index === 0) ||
                                        (activeIndex >= tabs.length - 1 &&
                                            index === tabs.length - 1)
                                            ? style.selected
                                            : ''
                                    }`}
                                    key={item.label}
                                    onClick={() => {
                                        swipeTo(index);
                                    }}
                                    type="button"
                                >
                                    {item.label}
                                </ButtonBase>
                            ) : (
                                <button
                                    className={`ui-slick-button ${style.tabButton} ${
                                        activeStatus === index ? style.selected : ''
                                    } ${
                                        (activeIndex < 0 && index === 0) ||
                                        (activeIndex >= tabs.length - 1 &&
                                            index === tabs.length - 1)
                                            ? style.selected
                                            : ''
                                    }`}
                                    key={item.label}
                                    onClick={() => {
                                        swipeTo(index);
                                    }}
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function Slick({ tabs, children, styling = 'button', initialSlide = 0, className }: SlickProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState('prev');
    const swiperRef = useRef<Swiper | null>(null);
    const tabWidth = 100 / tabs.length;

    const updateTabPosition = (swiper: Swiper) => {
        const translate = swiper.translate;
        const progress = translate / (swiper as SwiperExpansion).maxTranslate();
        setActiveIndex(progress * (tabs.length - 1));
        setDirection(swiper.swipeDirection);
    };

    const handleTouchEnd = (swiper: Swiper) => {
        if (swiper.isEnd || swiper.isBeginning) {
            setActiveIndex(swiper.activeIndex);
        } else {
            setActiveIndex(Math.round(swiper.activeIndex));
        }
        setDirection('');
    };

    const swipeTo = (index: number) => {
        swiperRef.current && swiperRef.current.slideTo(index);
    };

    const transitionEnd = (index: number) => {
        if (tabs[index].href) {
            history.replaceState({}, '', tabs[index].href);
        }
    };

    return (
        <div className={`ui-slick ${className}`} id="ui-slick">
            <SlickNav
                activeIndex={activeIndex}
                direction={direction}
                styling={styling}
                swipeTo={swipeTo}
                tabWidth={tabWidth}
                tabs={tabs}
            />
            <SwiperClass
                initialSlide={initialSlide}
                onSlideChange={swiper => {
                    setActiveIndex(swiper.activeIndex);
                }}
                onSlideChangeTransitionEnd={swiper => {
                    transitionEnd(swiper.activeIndex);
                }}
                onSliderMove={swiper => {
                    updateTabPosition(swiper);
                }}
                onSwiper={swiper => {
                    swiperRef.current = swiper;
                }}
                onTouchEnd={handleTouchEnd}
                slidesPerView={1}
                spaceBetween={50}
            >
                {Children.map(children, child => {
                    return <SwiperSlide>{child}</SwiperSlide>;
                })}
            </SwiperClass>
        </div>
    );
}

export { Slick };
