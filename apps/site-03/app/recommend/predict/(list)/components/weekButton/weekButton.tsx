import { useState } from 'react';
import style from './weekButton.module.scss';

function WeekButton() {
    const [isActive, setIsActive] = useState('rank');

    const weekList = [
        {
            label: '连红',
            value: 'rank'
        },
        {
            label: '季榜',
            value: 'season'
        },
        {
            label: '月榜',
            value: 'month'
        },
        {
            label: '周榜',
            value: 'week'
        }
    ];

    return (
        <div className={style.weekButton}>
            {weekList.map(item => {
                return (
                    <div
                        className={`${isActive === item.value ? style.active : ''}`}
                        key={item.value}
                        onClick={() => {
                            setIsActive(item.value);
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
