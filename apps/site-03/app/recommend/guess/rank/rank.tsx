import PeriodListItem from '../components/period/periodListItem';
import Soccer from '../components/period/img/soccerblue.svg';
import style from './rank.module.scss';
import Avatar from '@/components/avatar/avatar';

function Rank() {
    const userData = {
        avatar: undefined,
        name: '郭台銘',
        record: 2,
        victory: 6,
        defeat: 4,
        winRate: 99
    };

    return (
        <div className={style.rank}>
            <div className={style.userRank}>
                <div className={style.ranking}>
                    你排名<span>24</span>
                </div>
                <div className={style.container}>
                    <div className={style.avatarContainer}>
                        <Avatar src={userData.avatar} />
                    </div>
                    <div className={style.content}>
                        <div className={style.name}>{userData.name}</div>
                        <div className={style.detail}>
                            <div>战绩: {userData.record}场</div>
                            <div>
                                胜负: <span className={style.victory}>{userData.victory}</span>/
                                {userData.defeat}
                            </div>
                        </div>
                    </div>
                    <div className={style.winRateBlock}>
                        <Soccer className={style.icon} />
                        <span className={style.winRate}>
                            <span>{userData.winRate}</span>
                            <span className={style.percent}>%</span>
                        </span>
                    </div>
                </div>
            </div>
            <PeriodListItem ranking={1} winRate={98} />
            <PeriodListItem ranking={2} winRate={90} />
            <PeriodListItem ranking={3} winRate={60} />
            <PeriodListItem ranking={4} winRate={20} />
        </div>
    );
}

export default Rank;
