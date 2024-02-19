'use client';
import type { ReactNode } from 'react';
import { useState, Children, useRef, useEffect } from 'react';
import { Swiper as SwiperClass, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import ButtonBase from '@mui/material/ButtonBase';
import style from './slick.module.scss';

type Styling = 'text' | 'underline' | 'button';
type TabsType = { label: string; href?: string; status: string | null }[];
interface SlickProps {
    autoHeight?: boolean;
    fixedTabs?: boolean;
    tabs: TabsType;
    children: ReactNode;
    styling?: Styling;
    initialSlide?: number;
    className?: string;
    onSlickEnd: (nowIndex: number, prevIndex: number) => void;
    resetHeightKey?: string;
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
    direction,
    fixedTabs
}: {
    tabWidth: number;
    activeIndex: number;
    styling: Styling;
    tabs: TabsType;
    swipeTo: (index: number) => void;
    direction: string;
    fixedTabs: boolean;
}) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const activeStatus =
        direction === 'next' ? Math.floor(activeIndex) + 1 : Math.floor(activeIndex);

    return (
        <>
            {fixedTabs ? (
                <div className={`ui-slick-tabs-placeholder ${style.placeholder}`} />
            ) : null}

            <div className={`ui-slick-nav ${fixedTabs && style.fixed}`}>
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
                                                activeStatus === index
                                                    ? `${style.selected} ui-slick-button-selected`
                                                    : ''
                                            } ${
                                                (activeIndex < 0 && index === 0) ||
                                                (activeIndex >= tabs.length - 1 &&
                                                    index === tabs.length - 1)
                                                    ? `${style.selected} ui-slick-button-selected`
                                                    : ''
                                            }`}
                                            disableRipple
                                            disableTouchRipple
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
                                                activeStatus === index
                                                    ? `${style.selected} ui-slick-button-selected`
                                                    : ''
                                            } ${
                                                (activeIndex < 0 && index === 0) ||
                                                (activeIndex >= tabs.length - 1 &&
                                                    index === tabs.length - 1)
                                                    ? `${style.selected} ui-slick-button-selected`
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
            </div>
        </>
    );
}

const slickOption: Record<string, () => void> = {};

function Slick({
    autoHeight = false,
    fixedTabs = false,
    tabs,
    children,
    styling = 'button',
    initialSlide = 0,
    className,
    onSlickEnd,
    resetHeightKey = 'slickDefault'
}: SlickProps) {
    const [activeIndex, setActiveIndex] = useState(initialSlide);
    const [direction, setDirection] = useState('prev');
    const [swiperInit, setSwiperInit] = useState(false);

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

    slickOption[`${resetHeightKey}ResetHeight`] = () => {
        if (!swiperInit) return;
        setTimeout(() => {
            swiperRef.current?.updateAutoHeight();
        }, 0);
    };

    const transitionEnd = (nowIndex: number, prevIndex: number) => {
        if (tabs[nowIndex].href) {
            history.replaceState({}, '', tabs[nowIndex].href);
        }
        onSlickEnd(nowIndex, prevIndex);
        slickOption[`${resetHeightKey}ResetHeight`];
    };

    return (
        <div className={`ui-slick ${className}`} id="ui-slick">
            <SlickNav
                activeIndex={activeIndex}
                direction={direction}
                fixedTabs={fixedTabs}
                styling={styling}
                swipeTo={swipeTo}
                tabWidth={tabWidth}
                tabs={tabs}
            />
            <SwiperClass
                autoHeight={autoHeight}
                initialSlide={initialSlide}
                onSlideChange={swiper => {
                    setActiveIndex(swiper.activeIndex);
                }}
                onSlideChangeTransitionEnd={swiper => {
                    transitionEnd(swiper.activeIndex, swiper.previousIndex);
                }}
                onSliderMove={swiper => {
                    updateTabPosition(swiper);
                }}
                onSwiper={swiper => {
                    swiperRef.current = swiper;
                    setSwiperInit(true);
                }}
                onTouchEnd={handleTouchEnd}
                slidesPerView={1}
                spaceBetween={50}
            >
                {Children.map(children, child => {
                    if (!child) {
                        return null;
                    }
                    return <SwiperSlide>{child}</SwiperSlide>;
                })}
            </SwiperClass>
        </div>
    );
}

export { Slick, slickOption };
