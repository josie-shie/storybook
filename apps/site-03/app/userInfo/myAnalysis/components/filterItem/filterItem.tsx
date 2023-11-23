'use client';
import { useRouter } from 'next/navigation';
import { useArticleFilterStore } from './filterStore';
import style from './filterItem.module.scss';

function FilterItem() {
    const router = useRouter();
    const filterList = useArticleFilterStore.use.filterList();

    const goDetail = () => {
        router.push('/userInfo/myAnalysis/createArticle?step=1');
    };

    return (
        <>
            {filterList.map(item => {
                return (
                    <div
                        className={style.filterItem}
                        key={item.id}
                        onClick={() => {
                            goDetail();
                        }}
                    >
                        <div className={style.left}>
                            <div className={style.top}>
                                <span className={style.name}>{item.gameName}</span>
                                <span className={style.time}>{item.gameTime}</span>
                            </div>
                            <div className={style.game}>
                                <span className={style.home}>{item.homeTeam}</span>
                                <span className={style.compete}>VS</span>
                                <span className={style.away}>{item.awayTeam}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default FilterItem;
