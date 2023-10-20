import style from './gameCard.module.scss';
import Video from './img/video.svg';
import Flag from './img/flag.svg';

function ExtraInfo() {
    return <div className={style.extraInfo}>90 分鐘 [0-0], 加時中,現在比分[1-1]</div>;
}

function OddsInfo() {
    return (
        <div className={style.oddsInfo}>
            <span className={`${style.odd} ${style.left}`}>
                <p>0.85</p>
                <p className={style.blue}>0/0.5</p>
                <p>1.00</p>
            </span>
            <span className={style.mid}>
                <p>(0-1)</p>
            </span>
            <span className={style.odd}>
                <p>0.85</p>
                <p className={style.blue}>2</p>
                <p>1.00</p>
            </span>
        </div>
    );
}

function TeamInfo() {
    return (
        <div className={style.teamInfo}>
            <div className={`${style.homeTeam} ${style.team}`}>
                <div className={style.cards}>
                    <p className={`${style.redCard} ${style.card}`}>6</p>
                    <p className={`${style.yellowCard} ${style.card}`}>1</p>
                </div>
                巴西
            </div>
            <div className={style.score}>1 - 1</div>
            <div className={`${style.awayTeam} ${style.team}`}>
                西班牙
                <div className={style.cards}>
                    <p className={`${style.redCard} ${style.card}`}>2</p>
                    <p className={`${style.yellowCard} ${style.card}`}>3</p>
                </div>
            </div>
        </div>
    );
}

function TopArea() {
    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div className={style.league}>巴西甲</div>
                <div className={style.time}>11:30</div>
            </div>
            <div className={style.mid}>
                <div className={style.corner}>
                    <Flag /> <span className={style.ratio}>5-10</span>
                </div>
                <div className={style.status}>完</div>
                <div className={style.corner}>
                    <Flag /> <span className={style.ratio}>5-10</span>
                </div>
            </div>
            <div className={style.video}>
                <Video className={style.videoIcon} />
            </div>
        </div>
    );
}

function GameCard() {
    return (
        <li className={style.gameCard}>
            <TopArea />
            <TeamInfo />
            <OddsInfo />
            <ExtraInfo />
        </li>
    );
}

export default GameCard;
