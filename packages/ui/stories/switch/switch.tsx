'use client';

import { useRef, useEffect, useState } from 'react';
import style from './switch.module.scss';

interface Sports {
    /**
     * push name in this array
     */
    name?: string[];
}

function Switch({ name }: Sports) {
    const switchRef = useRef<HTMLDivElement | null>(null);
    const [activeSport, setActiveSport] = useState<string>(name?.[0] || '');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: '1px', width: 'auto' });

    const updateIndicator = () => {
        const switchElement = switchRef.current;
        if (switchElement) {
            const activeElement = switchElement.querySelector(`.${style.active}`);
            if (activeElement && activeElement instanceof HTMLElement) {
                setIndicatorStyle({
                    left: `${activeElement.offsetLeft + 1}px`,
                    width: `${activeElement.offsetWidth - 2}px`
                });
            }
        }
    };

    useEffect(updateIndicator, [activeSport]);

    return (
        <div className={`switch ${style.switch}`} ref={switchRef}>
            {name?.map(item => (
                <span
                    className={activeSport === item ? `active ${style.active}` : ''}
                    key={item}
                    onClick={() => {
                        setActiveSport(item);
                        updateIndicator();
                    }}
                >
                    {item}
                </span>
            ))}
            <div className={`indicator ${style.indicator}`} style={indicatorStyle} />
        </div>
    );
}

export { Switch };
