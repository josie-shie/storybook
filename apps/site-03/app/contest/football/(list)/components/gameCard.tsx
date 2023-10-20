import style from './gameCard.module.scss';
import Video from './img/video.svg';

function TopArea() {
    return (
        <div className={style.topArea}>
            <div className={style.league}>巴西甲</div>
            <div className={style.time}>11:30</div>
            <div className={style.video}>
                <Video />
            </div>
        </div>
    );
}

function GameCard() {
    return (
        <div className={style.gameCard}>
            <TopArea />
        </div>
    );
}

export default GameCard;
