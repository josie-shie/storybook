'use client';

import style from './weekButton.module.scss';

interface WeekButtonProps {
    isActive: number[];
    updateActive: (val: number) => void;
}

function WeekButton({ isActive = [], updateActive }: WeekButtonProps) {
    const weekList = [
        {
            label: '连红',
            value: 3
        },
        {
            label: '季榜',
            value: 0
        },
        {
            label: '月榜',
            value: 1
        },
        {
            label: '周榜',
            value: 2
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
