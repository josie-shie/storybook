'use client';

import { useRef, useEffect, useState } from 'react';
import style from './switch.module.scss';

interface Option {
    label: string;
    value: string;
}

export interface SwitchProps {
    /**
     * List of options
     */
    options?: Option[];
    /**
     * current active switch
     */
    value?: string;
    /**
     * change value
     */
    onChange: (value: string) => void;
}

function Switch({ options, value, onChange }: SwitchProps) {
    const switchRef = useRef<HTMLDivElement | null>(null);
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

    useEffect(updateIndicator, [value]);

    return (
        <div className={`switch ${style.switch}`} ref={switchRef}>
            {options?.map(item => (
                <span
                    className={value === item.value ? `active ${style.active}` : ''}
                    key={item.value}
                    onClick={() => {
                        onChange(item.value);
                    }}
                >
                    {item.label}
                </span>
            ))}
            <div className={`indicator ${style.indicator}`} style={indicatorStyle} />
        </div>
    );
}

export { Switch };
