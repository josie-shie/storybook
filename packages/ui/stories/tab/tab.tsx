import type { ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef, Children, isValidElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import Link from 'next/link';
import style from './tab.module.scss';

interface TabProps {
    label: string;
    value?: string;
    to?: string;
    children: ReactNode;
    leftSection?: ReactNode; // 左邊的icon
    rightSection?: ReactNode; // 右邊的icon
}

interface TabsProps {
    defaultValue?: string | number;
    /**
     * tab header map
     */
    // tabValueToIndexMap?: Record<string, number>;
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
     * tab container padding
     * tab內容是否無padding
     */
    fullBlock?: boolean;
    /**
     * tab header background color style change
     * tab header 背景顏色
     */
    buttonRadius?: number;
    /**
     * tab swiper content auto height
     * tab swiper 內容自動高度開關
     */
    autoHeight?: boolean;
    /**
     * control TabContent
     */
    children?: string | ReactNode;
    /**
     * Tab change event
     */
    onTabChange?: (value: string) => void;
}

function Tab(props: TabProps) {
    return <>{props.children}</>;
}

function Tabs({
    defaultValue,
    autoHeight = false,
    position = 'center',
    gap = 12,
    styling = 'text',
    scrolling = false,
    swiperOpen = true,
    fullBlock = false,
    buttonRadius = 50,
    onTabChange,
    ...props
}: TabsProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const headerLinerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperCore | null>(null);
    const [contentFade, setContentFade] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            let foundIndex = React.Children.toArray(props.children).findIndex(child => {
                if (React.isValidElement(child)) {
                    const element = child as React.ReactElement<{ to?: string }>;
                    return element.props.to === pathname;
                }
                return false;
            });

            foundIndex = foundIndex !== -1 ? foundIndex : 0;
            setActiveIndex(foundIndex);
        }
    }, [pathname, props.children]);

    const handleTabClick = (index: number, value?: string) => {
        const headerLiner = headerLinerRef.current;
        if (headerLiner) {
            if (activeIndex !== null) {
                if (index > activeIndex) {
                    headerLiner.classList.remove(style.secondClassName);
                    headerLiner.classList.add(style.firstClassName);
                } else if (index < activeIndex) {
                    headerLiner.classList.remove(style.firstClassName);
                    headerLiner.classList.add(style.secondClassName);
                }
            }
        }
        setActiveIndex(index);
        swiperRef.current?.slideTo(index);

        setContentFade(true);

        if (value && onTabChange) {
            onTabChange(value);
        }

        setTimeout(() => {
            setActiveIndex(index);
            swiperRef.current?.slideTo(index);
            setContentFade(false);
        }, 100);
    };

    useEffect(() => {
        const getSearchParams = Array.from(searchParams.entries());
        if (Array.isArray(props.children)) {
            const pathsArray = React.Children.toArray(props.children)
                .map(child => {
                    return (child as React.ReactElement<{ to: string }>).props.to;
                })
                .filter(path => typeof path === 'string' && path.length > 0);

            if (pathsArray.length === 0) {
                return;
            }

            let defaultActiveIndex = pathsArray.findIndex(path => {
                const [basePath, pathQueryString] = path.split('?');
                if (basePath === pathname) {
                    if (getSearchParams.length > 0) {
                        const [queryKey, queryValue] = getSearchParams[0];
                        if (pathQueryString) {
                            const [pathQueryKey, pathQueryValue] = pathQueryString.split('=');
                            return queryKey === pathQueryKey && queryValue === pathQueryValue;
                        }
                    } else {
                        return !pathQueryString;
                    }
                }
                return false;
            });

            if (defaultActiveIndex === -1) {
                defaultActiveIndex = pathsArray.findIndex(path => pathname.startsWith(path));
            }
            setActiveIndex(defaultActiveIndex);
        }
    }, [pathname, props.children, searchParams]);

    useEffect(() => {
        const updateHeaderLinerStyle = (index: number) => {
            const nav = navRef.current;
            const headerLiner = headerLinerRef.current;
            if (nav && headerLiner) {
                const elm = nav.children[index] as HTMLElement | null;
                if (elm) {
                    headerLiner.style.left = `${elm.offsetLeft}px`;
                    headerLiner.style.right = `${
                        nav.offsetWidth - (elm.offsetLeft + elm.offsetWidth)
                    }px`;
                    headerLiner.style.minWidth = `${elm.offsetWidth}px`;
                }
            }
        };

        if (activeIndex !== null) {
            updateHeaderLinerStyle(activeIndex);
        }

        window.addEventListener('resize', () => {
            if (activeIndex !== null) {
                updateHeaderLinerStyle(activeIndex);
            }
        });
        return () => {
            window.removeEventListener('resize', () => {
                if (activeIndex !== null) {
                    updateHeaderLinerStyle(activeIndex);
                }
            });
        };
    }, [activeIndex, position, gap, styling, scrolling]);

    useEffect(() => {
        if (swiperRef.current && typeof activeIndex === 'number') {
            swiperRef.current.slideTo(activeIndex);
        }

        const nav = navRef.current;
        const activeTab =
            nav && activeIndex !== null ? (nav.children[activeIndex] as HTMLElement) : null;
        if (nav && activeTab) {
            const leftScrollPosition =
                activeTab.offsetLeft + activeTab.offsetWidth / 2 - nav.offsetWidth / 2;
            nav.scrollTo({
                left: leftScrollPosition,
                behavior: 'smooth'
            });
        }
    }, [activeIndex, swiperRef]);

    useEffect(() => {
        if (typeof defaultValue === 'number') {
            setActiveIndex(defaultValue);
        } else if (typeof defaultValue === 'string') {
            const index = React.Children.toArray(props.children).findIndex(child => {
                if (
                    React.isValidElement(child) &&
                    (child as React.ReactElement<{ value: string }>).props.value === defaultValue
                ) {
                    return true;
                }
                return false;
            });

            if (index !== -1) {
                setActiveIndex(index);
            }
        }
    }, [defaultValue, props.children]);

    return (
        <div className={`ui-tab ${style.tab} ${fullBlock && style.fullBlock} ${style[position]}`}>
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
                                value?: string;
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
                                                handleTabClick(index, labeledChild.props.value);
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
                    autoHeight={autoHeight}
                    className={style.swiperLayout}
                    onSlideChange={swiper => {
                        const tabIndex = swiper.activeIndex;
                        handleTabClick(swiper.activeIndex);
                        setActiveIndex(swiper.activeIndex);

                        const childrenArray = React.Children.toArray(props.children);
                        if (
                            childrenArray[tabIndex] &&
                            React.isValidElement(childrenArray[tabIndex])
                        ) {
                            const tab = childrenArray[tabIndex] as React.ReactElement<{
                                to?: string;
                                value?: string;
                            }>;

                            if (tab.props.value && onTabChange) {
                                onTabChange(tab.props.value);
                            }

                            if (tab.props.to) {
                                const currentSearchParams = new URLSearchParams(
                                    window.location.search
                                );
                                const tabSearchParams = new URLSearchParams(
                                    new URL(tab.props.to, window.location.href).search
                                );

                                // 目前只有state=schedule會用到日期 先判斷不是schedule的狀態都先刪除scheduleDate
                                if (tabSearchParams.get('status') !== 'schedule') {
                                    currentSearchParams.delete('scheduleDate');
                                } else {
                                    const scheduleDate = currentSearchParams.get('scheduleDate');
                                    if (scheduleDate) {
                                        tabSearchParams.set('scheduleDate', scheduleDate);
                                    }
                                }

                                tabSearchParams.forEach((value, key) => {
                                    currentSearchParams.set(key, value);
                                });

                                const search = currentSearchParams.toString();
                                const url = `${tab.props.to.split('?')[0]}?${search}`;
                                router.push(url);
                            }
                        }
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
                    {activeIndex !== null && Children.toArray(props.children)[activeIndex]}
                </div>
            )}
        </div>
    );
}

export { Tabs, Tab };
