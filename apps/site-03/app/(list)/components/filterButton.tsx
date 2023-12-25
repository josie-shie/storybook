import { useState } from 'react';
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
            </div>
            <Filter isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </>
    );
}

export default FilterButton;
