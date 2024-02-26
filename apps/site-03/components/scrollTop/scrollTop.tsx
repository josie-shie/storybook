import type { RefObject } from 'react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import style from './scrollTop.module.scss';
import ArrowIcon from './img/arrow.png';

interface ScrollTopProps {
    scrollContainerRef?: RefObject<HTMLElement>;
}

function ScrollTop({ scrollContainerRef }: ScrollTopProps) {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const scrollTop = () => {
        const scrollContainer = scrollContainerRef?.current ?? window;
        if (scrollContainer instanceof HTMLElement) {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        const scrollY = scrollContainerRef?.current
            ? scrollContainerRef.current.scrollTop
            : window.scrollY;
        setShowScrollTop(scrollY > 600);
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current ?? window;
        const onScroll = () => {
            handleScroll();
        };
        scrollContainer.addEventListener('scroll', onScroll);

        return () => {
            scrollContainer.removeEventListener('scroll', onScroll);
        };
    }, [scrollContainerRef]);

    return (
        <div className={`${style.scrollWrapper} ${showScrollTop ? style.active : ''}`}>
            <div className={style.goTop} onClick={scrollTop}>
                <Image alt="goTop" className={style.arrow} src={ArrowIcon} />
            </div>
        </div>
    );
}

export default ScrollTop;
