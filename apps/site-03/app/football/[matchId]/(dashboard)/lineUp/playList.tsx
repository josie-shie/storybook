'use client';
import type { PlayerList } from 'data-center';
import Coat from './img/coat.png';
// import ChangeUp from './img/changeUp.svg';
// import Ball from './img/ball.svg';
// import RedCard from './img/redCard.svg';
// import YellowCard from './img/yellowCard.svg';
// import Support from './img/support.svg';
// import Winner from './img/winner.svg';
import style from './playList.module.scss';

interface PlayerListProps {
    homeBackUp: PlayerList[];
    awayBackUp: PlayerList[];
    homeColor: string;
    awayColor: string;
}

interface PlayerItemProps {
    playerList: PlayerList;
    teamColor: string;
}

function PlayerItem({ playerList, teamColor }: PlayerItemProps) {
    const getPositionName = {
        0: '守门员',
        1: '后卫',
        2: '中场',
        3: '前锋',
        255: ''
    };

    const shortName = (name: string) => {
        const fullName = name;
        const lastIndexOfDot = fullName.lastIndexOf('·');
        const lastNamePart =
            lastIndexOfDot !== -1 ? fullName.substring(lastIndexOfDot + 1) : fullName;

        return lastNamePart;
    };

    return (
        <div className={style.playerItem}>
            <div className={style.detail}>
                <div className={style.left} style={{ backgroundColor: teamColor }}>
                    <div className={style.coat} style={{ backgroundImage: `url(${Coat.src})` }}>
                        {playerList.number}
                    </div>
                </div>
                <div className={style.substitute}>
                    <div className={style.nameScore}>
                        <p className={style.name}>
                            {playerList.nameChs && playerList.nameChs !== '0'
                                ? shortName(playerList.nameChs)
                                : playerList.nameEn}
                        </p>
                        <div className={style.score}>
                            <p className={style.position}>{getPositionName[playerList.position]}</p>
                            {/* <div className={style.tag} style={{ backgroundColor: teamColor }}>
                                {score}
                            </div> */}
                            {/* <YellowCard /> */}
                        </div>
                    </div>
                    {/* <div className={style.time}>
                        <ChangeUp width={20} height={20} />
                        <span>69'</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

function PlayerList({ homeBackUp, awayBackUp, homeColor, awayColor }: PlayerListProps) {
    return (
        <div className={style.playerList}>
            <div className={style.container}>
                {homeBackUp.map(item => (
                    <PlayerItem
                        key={`${item.playerId}-${item.number}`}
                        playerList={item}
                        teamColor={homeColor}
                    />
                ))}
            </div>
            <div className={style.line} />
            <div className={style.container}>
                {awayBackUp.map(item => (
                    <PlayerItem
                        key={`${item.playerId}-${item.number}`}
                        playerList={item}
                        teamColor={awayColor}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlayerList;
