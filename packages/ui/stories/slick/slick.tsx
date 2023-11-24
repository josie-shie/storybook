'use client';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useRouter } from 'next/navigation';
import style from './slick.module.scss';

interface SlickProps {
    children: ReactNode;
    tabs: { label: string; href: string }[];
    styling?: 'text' | 'underline' | 'button';
    initialSlide?: number;
}

function Slick({ children, styling = 'underline', tabs, initialSlide = 0 }: SlickProps) {
    const [nav, setNav] = useState(initialSlide);
    const slider = useRef(null);
    const router = useRouter();

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
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

    return (
        <div className={style.slick}>
            <div className={style.tabsContainer}>
                <ul className={`${style.tabs} ${style[styling]}`}>
                    {tabs.map((item, index) => {
                        return (
                            <li key={item.label}>
                                <button
                                    className={nav === index ? style.selected : ''}
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
