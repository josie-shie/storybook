import type { ReactNode } from 'react';
import React, { useState, useEffect, useRef, Children, isValidElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import style from './tab.module.scss';

interface TabProps {
    label: string;
    children: ReactNode;
}

interface TabsProps {
    /**
     * tab header position
     * tab header位置的切換
     */
    tabHeaderPosition?:
        | 'center'
        | 'spaceBetween'
        | 'spaceAround'
        | 'spaceEvenly'
        | 'flexStart'
        | 'flexEnd';
    /**
     * tab header position gap
     * tab header 空隙間隔
     */
    tabHeaderGap?: number;
    /**
     * tab header style change
     * tab header的樣式顯示方式
     */
    tabHeaderStyle?: 'text' | 'underline' | 'button';
    /**
     * tab container swiper change
     * tab內容swiper是否開啟
     */
    tabsSwiper?: boolean;
    /**
     * tab bg style change
     * tab背景顏色
     */
    tabBackground?: string;
    /**
     * tab header color style change
     * tab header 文字字體顏色
     */
    tabHeaderColor?: string;
    /**
     * tab header background color style change
     * tab header 背景顏色
     */
    tabHeaderBgColor?: string;
    /**
     * control TabContent
     */
    children?: string | ReactNode;
}

function Tab(props: TabProps) {
    return <>{props.children}</>;
}

function Tabs({
    tabHeaderPosition = 'center',
    tabHeaderGap = 12,
    tabHeaderStyle = 'text',
    tabsSwiper = true,
    tabBackground = '#1c1c1d',
    tabHeaderColor = '#fff',
    tabHeaderBgColor = '#2d2d2d',
    ...props
}: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);
    const headerLinerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperCore | null>(null);
    const [contentFade, setContentFade] = useState(false);

    const handleTabClick = (index: number) => {
        const headerLiner = headerLinerRef.current;
        if (headerLiner) {
            if (index > activeIndex) {
                headerLiner.classList.remove(style.secondClassName);
                headerLiner.classList.add(style.firstClassName);
            } else if (index < activeIndex) {
                headerLiner.classList.remove(style.firstClassName);
                headerLiner.classList.add(style.secondClassName);
            }
        }
        setActiveIndex(index);
        swiperRef.current?.slideTo(index);

        setContentFade(true);

        setTimeout(() => {
            setActiveIndex(index);
            swiperRef.current?.slideTo(index);
            setContentFade(false);
        }, 100);
    };

    useEffect(() => {
        const updateHeaderLinerStyle = (index: number) => {
            const nav = navRef.current;
            const headerLiner = headerLinerRef.current;
            if (nav && headerLiner) {
                const elm = nav.children[index] as HTMLElement;
                headerLiner.style.left = `${elm.offsetLeft}px`;
                headerLiner.style.right = `${
                    nav.offsetWidth - (elm.offsetLeft + elm.offsetWidth)
                }px`;
                headerLiner.style.minWidth = `${elm.offsetWidth}px`;
            }
        };

        updateHeaderLinerStyle(activeIndex);

        window.addEventListener('resize', () => {
            updateHeaderLinerStyle(activeIndex);
        });
        return () => {
            window.removeEventListener('resize', () => {
                updateHeaderLinerStyle(activeIndex);
            });
        };
    }, [activeIndex, tabHeaderPosition, tabHeaderStyle]);

    return (
        <div
            className={`${style.tab} ${style[tabHeaderPosition]}`}
            style={{ backgroundColor: tabBackground }}
        >
            <div className={style.tabHeader}>
                <div
                    className={`${style.tabsHeader} ${style[tabHeaderPosition]}`}
                    ref={navRef}
                    style={{ gap: tabHeaderGap }}
                >
                    {Children.map(props.children, (child, index) => {
                        if (isValidElement(child) && child.type === Tab) {
                            const labeledChild = child as React.ReactElement<{
                                label: React.ReactNode;
                            }>;
                            return (
                                <div
                                    className={`${style[tabHeaderStyle]} ${
                                        activeIndex === index ? style.active : ''
                                    }`}
                                    onClick={() => {
                                        handleTabClick(index);
                                    }}
                                    style={{
                                        color: tabHeaderColor,
                                        backgroundColor:
                                            tabHeaderStyle === 'button' ? tabHeaderBgColor : ''
                                    }}
                                >
                                    {labeledChild.props.label}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                {tabHeaderStyle === 'underline' && (
                    <div
                        className={style.tabHeaderLiner}
                        ref={headerLinerRef}
                        style={{ backgroundColor: tabHeaderBgColor }}
                    />
                )}
            </div>

            {tabsSwiper ? (
                <Swiper
                    onSlideChange={swiper => {
                        handleTabClick(swiper.activeIndex);
                        setActiveIndex(swiper.activeIndex);
                    }}
                    onSwiper={swiper => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1}
                    spaceBetween={50}
                    speed={800}
                >
                    {Children.map(props.children, (child, index) => {
                        if (isValidElement(child) && child.type === Tab) {
                            return <SwiperSlide key={index || undefined}>{child}</SwiperSlide>;
                        }
                        return null;
                    })}
                </Swiper>
            ) : (
                <div className={`${style.tabContainer} ${contentFade ? style.fade : ''}`}>
                    {Children.toArray(props.children)[activeIndex]}
                </div>
            )}
        </div>
    );
}

export { Tabs, Tab };
