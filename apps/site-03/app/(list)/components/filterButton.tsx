import { useState } from 'react';
import Image from 'next/image';
import FilterIcon from '../img/filter.png';
import style from './filterButton.module.scss';
import Filter from './filter';

function FilterButton() {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
    };
    const onOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className={style.filter} onClick={onOpen}>
                赛事筛选
                <Image alt="filter" className={style.mr} sizes="32" src={FilterIcon} />
            </div>
            <Filter isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </>
    );
}

export default FilterButton;
