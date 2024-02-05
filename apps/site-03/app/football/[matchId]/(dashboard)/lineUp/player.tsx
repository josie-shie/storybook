'use client';
import Image from 'next/image';
import type { PlayerList } from 'data-center';
import Captain from './img/captain.png';
import style from './player.module.scss';
import DefaultPlayer from './img/defaultPlayer.png';

interface PlayerProps {
    lineUpData: PlayerList;
    teamColor: string;
    isBottom?: boolean;
}

function Player({ lineUpData, teamColor, isBottom = false }: PlayerProps) {
    const positionStyle = isBottom
        ? {
              left: `${100 - lineUpData.positionX}%`,
              bottom: `${lineUpData.positionY}%`,
              zIndex: '10'
          }
        : { left: `${lineUpData.positionX}%`, top: `${lineUpData.positionY}%`, zIndex: '10' };
    const additionalClass = isBottom ? style.away : '';

    const shortName = (name: string) => {
        const fullName = name;
        const lastIndexOfDot = fullName.lastIndexOf('·');
        const lastNamePart =
            lastIndexOfDot !== -1 ? fullName.substring(lastIndexOfDot + 1) : fullName;

        return lastNamePart;
    };
    return (
        <div className={`${style.player} ${additionalClass}`} style={positionStyle}>
            <div className={style.playerBox}>
                <div
                    className={style.playerImg}
                    style={{
                        backgroundImage: `url(${
                            lineUpData.playerLogo && lineUpData.playerLogo !== '0'
                                ? lineUpData.playerLogo
                                : DefaultPlayer.src
                        })`,
                        borderColor: teamColor
                    }}
                >
                    <div className={style.leftTop}>
                        <div className={style.cover}>{lineUpData.number}</div>
                        <div className={style.color} style={{ backgroundColor: teamColor }} />
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
                <div className={style.playerName}>
                    {lineUpData.isCaptain ? (
                        <Image
                            alt="captain"
                            className={style.icon}
                            height={12}
                            src={Captain.src}
                            width={12}
                        />
                    ) : null}
                    <div>
                        {lineUpData.nameChs && lineUpData.nameChs !== '0'
                            ? shortName(lineUpData.nameChs)
                            : lineUpData.nameEn}
                    </div>
                </div>
                {/* <p className={style.playerScore} style={{ backgroundColor: teamColor }}>
                    <Winner className={style.icon} width={12} height={12} />
                    <span>{lineUpData.number}</span>
                </p> */}
            </div>
        </div>
    );
}

export default Player;
