'use client';

import style from './longButton.module.scss';

interface WeekButtonProps {
    isActive: string[];
    updateActive: (val: string) => void;
}

function LongButton({ isActive = [], updateActive }: WeekButtonProps) {
    const longList = [
        {
            label: '3连',
            value: '3rd'
        },
        {
            label: '4连',
            value: '4rd'
        },
        {
            label: '4连以上',
            value: '4rdUp'
        },
        {
            label: '热门',
            value: 'hot'
        }
    ];

    return (
        <div className={style.longButton}>
            {longList.map(item => {
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

export default LongButton;
