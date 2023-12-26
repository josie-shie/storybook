'use client';

import style from './longButton.module.scss';

interface LongButtonProps {
    isActive: string[];
    updateActive: (val: string[]) => void;
}

function LongButton({ isActive = [], updateActive }: LongButtonProps) {
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

    const handleClick = (value: string) => {
        const filterActive = isActive.includes(value)
            ? isActive.filter(item => item !== value)
            : [...isActive, value];
        updateActive(filterActive);
    };

    return (
        <div className={style.longButton}>
            {longList.map(item => {
                return (
                    <div
                        className={`${isActive.includes(item.value) ? style.active : ''}`}
                        key={item.value}
                        onClick={() => {
                            handleClick(item.value);
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
