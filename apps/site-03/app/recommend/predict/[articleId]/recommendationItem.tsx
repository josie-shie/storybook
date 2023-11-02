import Image from 'next/image';
import style from './recommendationItem.module.scss';
import Star from './img/star.png';

interface LeagueNameProps {
    name: string;
    time: string;
}

interface RecommendationProps {
    time: string;
    leagueName: LeagueNameProps;
    teamName: string;
}

function RecommendationItem({ time, leagueName, teamName }: RecommendationProps) {
    return (
        <section className={style.item}>
            <div className={style.left}>
                <div className={style.time}>{time}</div>
                <div className={style.leagueName}>
                    <span className={style.name}>{leagueName.name}</span>
                    <span className={style.time}>| {leagueName.time}</span>
                </div>
                <div className={style.teamName}>
                    <span className={style.play}>让球</span>
                    <span className={style.name}>{teamName}</span>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.noPaid}>
                    <Image alt="" className={style.image} src={Star} width={14} />
                    <span className={style.text}>20元</span>
                </div>
                <div className={style.unlockMember}>已有5人解鎖</div>
            </div>
        </section>
    );
}

export default RecommendationItem;
