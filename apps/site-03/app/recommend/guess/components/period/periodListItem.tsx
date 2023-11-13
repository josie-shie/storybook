import Image from 'next/image';
import { useRankStore } from '../../rank/rankStore';
import style from './periodListItem.module.scss';
import Soccer from './img/soccer.png';
import Avatar from '@/components/avatar/avatar';

function PeriodListItem() {
    const rankList = useRankStore.use.rankList();

    const rankingClass = (ranking: number) => {
        return ranking > 0 && ranking < 6 ? style[`ranking${ranking}`] : '';
    };

    return (
        <>
            {rankList.map(item => {
                const hasHighWinRate = typeof item.winRate === 'number' && item.winRate >= 90;
                return (
                    <div className={style.periodListItem} key={item.name}>
                        <div className={`${style.rankingFlag} ${rankingClass(item.ranking)}`}>
                            {item.ranking}
                        </div>
                        <div className={style.avatarContainer}>
                            <Avatar src={item.avatar} />
                        </div>
                        <div className={style.content}>
                            <div className={style.name}>{item.name}</div>
                            <div className={style.detail}>
                                <div>战绩: {item.record}场</div>
                                <div>
                                    胜负: <span className={style.victory}>{item.victory}</span>/
                                    {item.defeat}
                                </div>
                            </div>
                        </div>
                        <div className={style.winRateBlock}>
                            {hasHighWinRate ? (
                                <Image alt="icon" className={style.icon} src={Soccer} />
                            ) : null}
                            <span
                                className={`${style.winRate} ${
                                    hasHighWinRate ? style.redFill : ''
                                }`}
                            >
                                <span>{item.winRate}</span>
                                <span className={style.percent}>%</span>
                            </span>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default PeriodListItem;
