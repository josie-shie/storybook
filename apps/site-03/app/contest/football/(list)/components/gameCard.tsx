import style from './gameCard.module.scss';
import Video from './img/video.svg';
import Flag from './img/flag.svg';

function TeamInfo() {
    return (
        <div className={style.teamInfo}>
            <div className={style.left}>巴西</div>
            <div className={style.mid}>1:1</div>
            <div className={style.right}>西班牙</div>
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
                    <Flag /> 5-10
                </div>
                <div className={style.status}>完</div>
                <div className={style.corner}>
                    <Flag /> 5-10
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
        <div className={style.gameCard}>
            <TopArea />
            <TeamInfo />
        </div>
    );
}

export default GameCard;
