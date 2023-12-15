'use client';

import { type PostFilter } from 'data-center';
import style from './weekButton.module.scss';

interface WeekButtonProps {
    isActive: string[];
    updateActive: (val: string) => void;
}

function WeekButton({ isActive = [], updateActive }: WeekButtonProps) {
    const weekList = [
        {
            label: '连红',
            value: 'winStreak' as PostFilter
        },
        {
            label: '季榜',
            value: 'quarterly' as PostFilter
        },
        {
            label: '月榜',
            value: 'monthly' as PostFilter
        },
        {
            label: '周榜',
            value: 'weekly' as PostFilter
        }
    ];

    return (
        <div className={style.weekButton}>
            {weekList.map(item => {
                return (
                    <div
                        className={`${isActive.includes(item.value) ? style.active : ''}`}
                        key={item.value}
                        onClick={() => {
                            updateActive(item.value);
                        }}
                    >
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
}

export default WeekButton;
