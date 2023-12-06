'use client';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useRouter } from 'next/navigation';
import style from './slick.module.scss';

interface SlickProps {
    children: ReactNode;
    tabs: { label: string; href: string }[];
    styling?: 'text' | 'underline' | 'button';
    slideActive?: number;
    touchMove?: boolean;
}

function Slick({
    children,
    styling = 'underline',
    tabs,
    slideActive = 0,
    touchMove = true
}: SlickProps) {
    const [nav, setNav] = useState(slideActive);
    const slider = useRef(null);
    const router = useRouter();

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        touchMove,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: nav,
        afterChange: (index: number) => {
            setNav(index);
            if (tabs[index].href) {
                // history.replaceState({}, '', tabs[index].href);
                router.push(tabs[index].href);
            }
        }
    };

    const sliderTo = (index: number) => {
        setNav(index);
        (slider.current as unknown as { slickGoTo: (index: number) => void }).slickGoTo(index);
    };

    useEffect(() => {
        if (nav === slideActive) return;
        sliderTo(slideActive);
    }, [slideActive]);

    return (
        <div className={`ui-slick ${style.slick}`}>
            <div className={`ui-slick-tabs-container ${style.tabsContainer}`}>
                <ul className={`ui-slick-tabs ${style.tabs} ${style[styling]}`}>
                    {tabs.map((item, index) => {
                        return (
                            <li className="ui-slick-li" key={item.label}>
                                <button
                                    className={`ui-slick-button ${
                                        nav === index ? style.selected : ''
                                    }`}
                                    key={item.label}
                                    onClick={() => {
                                        sliderTo(index);
                                    }}
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Slider ref={slider} {...settings}>
                {children}
            </Slider>
        </div>
    );
}

export { Slick };
