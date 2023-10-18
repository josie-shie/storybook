'use client';

import { useRef, useEffect, useState } from 'react';
import style from './switch.module.scss';

interface Sports {
    sports?: string[];
}

function Switch({ sports }: Sports) {
    const switchRef = useRef<HTMLDivElement | null>(null);
    const [activeSport, setActiveSport] = useState<string>(sports?.[0] || '');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '40px' });

    const updateIndicator = () => {
        const switchElement = switchRef.current;
        if (switchElement) {
            const activeElement = switchElement.querySelector(`.${style.active}`);
            if (activeElement && activeElement instanceof HTMLElement) {
                setIndicatorStyle({
                    left: `${activeElement.offsetLeft}px`,
                    width: `${activeElement.offsetWidth}px`
                });
            }
        }
    };

    useEffect(updateIndicator, [activeSport]);

    return (
        <div className={`ui-switch ${style.switch}`} ref={switchRef}>
            {sports?.map(sport => (
                <span
                    className={activeSport === sport ? style.active : ''}
                    key={sport}
                    onClick={() => {
                        setActiveSport(sport);
                        updateIndicator();
                    }}
                >
                    {sport}
                </span>
            ))}
            <div className={`${style.indicator}`} style={indicatorStyle} />
        </div>
    );
}

export default Switch;
