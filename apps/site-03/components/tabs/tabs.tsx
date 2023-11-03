'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import style from './tabs.module.scss';

interface TabsProps {
    labels: string[];
    paths: string[];
    styling?: 'underline' | 'button';
}

function Tabs({ labels, paths, styling = 'underline' }: TabsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const getSearchParams = Array.from(searchParams.entries());
    let defaultActiveIndex = paths.findIndex(path => {
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
        defaultActiveIndex = paths.findIndex(path => pathname.startsWith(path));
    }

    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
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
                const elm = nav.children[index] as HTMLElement | null;
                if (elm) {
                    highlighter.style.left = `${elm.offsetLeft}px`;
                    highlighter.style.right = `${
                        nav.offsetWidth - (elm.offsetLeft + elm.offsetWidth)
                    }px`;
                    highlighter.style.minWidth = `${elm.offsetWidth}px`;
                }
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
                                activeIndex === index ? `active ${style.active}` : ''
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
