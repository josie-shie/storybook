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
        </div>
    );
}

export default FilterButton;
