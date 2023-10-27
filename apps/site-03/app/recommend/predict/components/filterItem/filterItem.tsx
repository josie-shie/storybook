'use client';
import { useRouter } from 'next/navigation';
import style from './filterItem.module.scss';

interface PropsType {
    id: number;
    gameName: string;
    gameTime: string;
    homeTeam: string;
    awayTeam: string;
    articleNumber: number;
}

function FilterItem({ item }: { item: PropsType }) {
    const router = useRouter();

    const goDetail = () => {
        router.push('/recommend/predict/masterList');
    };

    return (
        <div className={style.filterItem}>
            <div className={style.top}>
                <span className={style.name}>{item.gameName}</span>
                <span className={style.time}>{item.gameTime}</span>
            </div>
            <div className={style.game}>
                <span className={style.home}>{item.homeTeam}</span>
                <span className={style.compete}>VS</span>
                <span className={style.away}>{item.awayTeam}</span>
            </div>
            <button className={style.article} onClick={goDetail} type="button">
                {item.articleNumber}篇专家文章
            </button>
        </div>
    );
}

export default FilterItem;
