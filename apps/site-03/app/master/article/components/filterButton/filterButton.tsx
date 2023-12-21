import Image from 'next/image';
import FilterIcon from '../../img/filter.png';
import { useArticleStore } from '../../articleStore';
import style from './filterButton.module.scss';

function FilterButton() {
    const setFilterIsOpen = useArticleStore.use.setFilterIsOpen();

    return (
        <div
            className={style.filter}
            onClick={() => {
                setFilterIsOpen({ status: true });
            }}
        >
            赛事筛选
            <Image alt="filter" className={style.mr} sizes="32" src={FilterIcon} />
        </div>
    );
}

export default FilterButton;
