'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './tabs.module.scss';

interface TabsProps {
    labels: string[];
    paths: string[];
    styling?: 'underline' | 'button';
}

function Tabs({ labels, paths, styling = 'underline' }: TabsProps) {
    const pathname = usePathname();
    const defaultActiveIndex = paths.indexOf(pathname);

    const [activeIndex, setActiveIndex] = useState(
        defaultActiveIndex !== -1 ? defaultActiveIndex : 0
    );
    const navRef = useRef<HTMLDivElement>(null);
    const highlighterRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (index: number) => {
        const highlighter = highlighterRef.current;
        if (highlighter) {
            if (index > activeIndex) {
                highlighter.classList.remove(style.secondClassName);
                highlighter.classList.add(style.firstClassName);
            } else if (index < activeIndex) {
                highlighter.classList.remove(style.firstClassName);
                highlighter.classList.add(style.secondClassName);
            }
        }
        setActiveIndex(index);
    };

    useEffect(() => {
        const updateHighlighterStyle = (index: number) => {
            const nav = navRef.current;
            const highlighter = highlighterRef.current;
            if (nav && highlighter) {
                const elm = nav.children[index] as HTMLElement;
                highlighter.style.left = `${elm.offsetLeft}px`;
                highlighter.style.right = `${
                    nav.offsetWidth - (elm.offsetLeft + elm.offsetWidth)
                }px`;
                highlighter.style.minWidth = `${elm.offsetWidth}px`;
            }
        };

        updateHighlighterStyle(activeIndex);

        window.addEventListener('resize', () => {
            updateHighlighterStyle(activeIndex);
        });
        return () => {
            window.removeEventListener('resize', () => {
                updateHighlighterStyle(activeIndex);
            });
        };
    }, [activeIndex, styling]);

    return (
        <div className={`tab ${style.tab}`}>
            <div className={`header ${style.header}`}>
                <div className={`tabs ${style.tabs}`} ref={navRef}>
                    {labels.map((label, index) => (
                        <Link
                            className={`item ${style[styling]} ${style.item} ${
                                activeIndex === index ? style.active : ''
                            }`}
                            href={paths[index]}
                            key={label}
                            onClick={() => {
                                handleTabClick(index);
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
                {styling === 'underline' && (
                    <div className={`liner ${style.liner}`} ref={highlighterRef} />
                )}
            </div>
        </div>
    );
}

export { Tabs };
