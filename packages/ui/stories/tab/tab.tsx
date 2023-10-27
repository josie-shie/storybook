import type { ReactNode } from 'react';
import React, { useState, useEffect, useRef, Children, isValidElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import Link from 'next/link';
import style from './tab.module.scss';

interface TabProps {
    label: string;
    to?: string;
    children: ReactNode;
    leftSection?: ReactNode; // 左邊的icon
    rightSection?: ReactNode; // 右邊的icon
}

interface TabsProps {
    /**
     * tab header position
     * tab header位置的切換
     */
    position?: 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly' | 'flexStart' | 'flexEnd';
    /**
     * tab header position gap
     * tab header 空隙間隔
     */
    gap?: number;
    /**
     * tab header style change
     * tab header的樣式顯示方式
     */
    styling?: 'text' | 'underline' | 'button';
    /**
     * tab header can scroll
     * tab header 過多時可以滾動
     */
    scrolling?: boolean;
    /**
     * tab container swiper change
     * tab內容swiper是否開啟
     */
    swiperOpen?: boolean;
    /**
     * tab header background color style change
     * tab header 背景顏色
     */
    buttonRadius?: number;
    /**
     * control TabContent
     */
    children?: string | ReactNode;
}

function Tab(props: TabProps) {
    return <>{props.children}</>;
}

function Tabs({
    position = 'center',
    gap = 12,
    styling = 'text',
    scrolling = false,
    swiperOpen = true,
    buttonRadius = 50,
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
    }, [activeIndex, position, gap, styling, scrolling]);

    return (
        <div className={`ui-tab ${style.tab} ${style[position]}`}>
            <div className={`ui-tab-header ${style.tabHeader}`}>
                <div
                    className={`ui-tabs-header ${style.tabsHeader} ${style[position]} ${
                        scrolling ? style.scrolling : ''
                    }`}
                    ref={navRef}
                    style={{ gap }}
                >
                    {Children.map(props.children, (child, index) => {
                        if (isValidElement(child) && child.type === Tab) {
                            const labeledChild = child as React.ReactElement<{
                                label: React.ReactNode;
                                to: string;
                                leftSection?: ReactNode;
                                rightSection?: ReactNode;
                            }>;
                            const content = (
                                <>
                                    {labeledChild.props.leftSection ? (
                                        <span
                                            className={`ui-tabs-header-icon ${style.tabsHeaderIcon}`}
                                        >
                                            {labeledChild.props.leftSection}
                                        </span>
                                    ) : null}

                                    <span className="ui-tabs-header-label">
                                        {labeledChild.props.label}
                                    </span>

                                    {labeledChild.props.rightSection ? (
                                        <span
                                            className={`ui-tabs-header-icon ${style.tabsHeaderIcon}`}
                                        >
                                            {labeledChild.props.rightSection}
                                        </span>
                                    ) : null}
                                </>
                            );
                            return (
                                <>
                                    {labeledChild.props.to ? (
                                        <Link
                                            className={`ui-button ${style[styling]} ${
                                                activeIndex === index
                                                    ? `ui-active ${style.active}`
                                                    : ''
                                            } ${style[`radius${buttonRadius}`]}`}
                                            href={labeledChild.props.to}
                                            onClick={() => {
                                                handleTabClick(index);
                                            }}
                                            style={{
                                                borderRadius: buttonRadius
                                            }}
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <div
                                            className={`ui-button ${style[styling]} ${
                                                activeIndex === index
                                                    ? `ui-active ${style.active}`
                                                    : ''
                                            } ${style[`radius${buttonRadius}`]}`}
                                            onClick={() => {
                                                handleTabClick(index);
                                            }}
                                            style={{
                                                borderRadius: buttonRadius
                                            }}
                                        >
                                            {content}
                                        </div>
                                    )}
                                </>
                            );
                        }
                        return null;
                    })}
                </div>
                {styling === 'underline' && (
                    <div
                        className={`ui-tab-header-liner ${style.tabHeaderLiner}`}
                        ref={headerLinerRef}
                    />
                )}
            </div>

            {swiperOpen ? (
                <Swiper
                    autoHeight
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
                <div
                    className={`ui-tab-container ${style.tabContainer} ${
                        contentFade ? style.fade : ''
                    }`}
                >
                    {Children.toArray(props.children)[activeIndex]}
                </div>
            )}
        </div>
    );
}

export { Tabs, Tab };
