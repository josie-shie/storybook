'use client';
import Change from './img/change.svg';
import Ball from './img/ball.svg';
import RedCard from './img/redCard.svg';
import YellowCard from './img/yellowCard.svg';
import Support from './img/support.svg';
import Winner from './img/winner.svg';
import style from './player.module.scss';
import DefaultPlayer from './img/defaultPlayer.png';
import type { PlayerList } from 'data-center';

interface PlayerProps {
    lineUpData: PlayerList;
    teamColor: string;
    isBottom?: boolean;
}

function Player({ lineUpData, teamColor, isBottom = false }: PlayerProps) {
    const positionStyle = isBottom
        ? { left: `${lineUpData.position_x}%`, bottom: `${lineUpData.position_y}%`, zIndex: '10' }
        : { left: `${lineUpData.position_x}%`, top: `${lineUpData.position_y}%`, zIndex: '10' };
    const additionalClass = isBottom ? style.away : '';
    return (
        <div className={`${style.player} ${additionalClass}`} style={positionStyle}>
            <div className={style.playerBox}>
                <div
                    className={style.playerImg}
                    style={{
                        backgroundImage: `url(${DefaultPlayer.src})`,
                        borderColor: teamColor
                    }}
                >
                    <div className={style.leftTop}>
                        <p style={{ backgroundColor: teamColor }}>{lineUpData.number}</p>
                    </div>
                    {/* <div className={style.leftBottom}>
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
                    </div> */}
                </div>
                <p className={style.playerName}>
                    {lineUpData.name_chs && lineUpData.name_chs !== '0'
                        ? lineUpData.name_chs
                        : lineUpData.name_en}
                </p>
                {/* <p className={style.playerScore} style={{ backgroundColor: teamColor }}>
                    <Winner className={style.icon} width={12} height={12} />
                    <span>{lineUpData.number}</span>
                </p> */}
            </div>
        </div>
    );
}

export default Player;
