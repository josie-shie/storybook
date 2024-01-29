'use client';
import Change from './img/change.svg';
import Ball from './img/ball.svg';
import RedCard from './img/redCard.svg';
import YellowCard from './img/yellowCard.svg';
import Support from './img/support.svg';
import Winner from './img/winner.svg';
import style from './player.module.scss';

interface PlayerProps {
    name: string;
    score: string;
    scoreColor: string;
    left: string;
    bottom?: string;
    top?: string;
    imgUrl: string;
    teamColor: string;
    isBottom?: boolean;
}

function Player({
    name,
    score,
    scoreColor,
    left,
    bottom,
    top,
    imgUrl,
    teamColor,
    isBottom = false
}: PlayerProps) {
    const positionStyle = isBottom ? { left, bottom, zIndex: '10' } : { left, top, zIndex: '10' };
    const additionalClass = isBottom ? style.away : '';
    return (
        <div className={`${style.player} ${additionalClass}`} style={positionStyle}>
            <div className={style.playerBox}>
                <div
                    className={style.playerImg}
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                        borderColor: teamColor
                    }}
                >
                    <div className={style.leftTop}>
                        <p style={{ backgroundColor: teamColor }}>25</p>
                    </div>
                    <div className={style.leftBottom}>
                        <span>
                            <YellowCard />
                        </span>
                    </div>
                    <div className={style.rightTop}>
                        <Change width={16} height={16} />
                        <span>15'</span>
                    </div>
                    <div className={style.rightBottom}>
                        <Ball width={16} height={16} />
                    </div>
                </div>
                <p className={style.playerName}>{name}</p>
                <p className={style.playerScore} style={{ backgroundColor: scoreColor }}>
                    <Winner className={style.icon} width={12} height={12} />
                    <span>{score}</span>
                </p>
            </div>
        </div>
    );
}

export default Player;
