'use client';
import type { PlayerList } from 'data-center';
import Coat from './img/coat.png';
// import ChangeUp from './img/changeUp.svg';
// import Ball from './img/ball.svg';
// import RedCard from './img/redCard.svg';
// import YellowCard from './img/yellowCard.svg';
// import Support from './img/support.svg';
// import Winner from './img/winner.svg';
import style from './playerList.module.scss';

interface PlayerListProps {
    homeBackUp: PlayerList[];
    awayBackUp: PlayerList[];
    homeColor: string;
    awayColor: string;
    homeFormation: string;
    awayFormation: string;
}

interface PlayerItemProps {
    playerList: PlayerList;
    teamColor: string;
    formation: string;
    isRight?: boolean;
}

function PlayerItem({ playerList, teamColor, formation, isRight = false }: PlayerItemProps) {
    const firstCharOfFormation = formation[0];

    const getPositionName = (format: string, position: number): string => {
        let positionsMap: string[];

        switch (format) {
            case '3':
                positionsMap = ['守门员', '后卫', '中场', '前锋'];
                break;
            case '4':
                positionsMap = ['守门员', '后卫', '后腰', '前腰', '前锋'];
                break;
            case '5':
                positionsMap = ['守门员', '后卫', '后腰', '中场', '前腰', '前锋'];
                break;
            default:
                positionsMap = [''];
        }

        return positionsMap[position] || '';
    };

    const shortName = (name: string) => {
        const fullName = name;
        const lastIndexOfDot = fullName.lastIndexOf('·');
        const lastNamePart =
            lastIndexOfDot !== -1 ? fullName.substring(lastIndexOfDot + 1) : fullName;

        return lastNamePart;
    };

    return (
        <div className={`${style.playerItem} ${isRight ? style.leftLine : ''}`}>
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
                            <p className={style.position}>
                                {getPositionName(firstCharOfFormation, playerList.position)}
                            </p>
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

function PlayerList({
    homeBackUp,
    awayBackUp,
    homeColor,
    awayColor,
    homeFormation,
    awayFormation
}: PlayerListProps) {
    return (
        <div className={style.playerList}>
            <div className={style.container}>
                {homeBackUp.map(item => (
                    <PlayerItem
                        formation={homeFormation}
                        key={item.playerId}
                        playerList={item}
                        teamColor={homeColor}
                    />
                ))}
            </div>
            <div className={style.container}>
                {awayBackUp.map(item => (
                    <PlayerItem
                        formation={awayFormation}
                        isRight
                        key={item.playerId}
                        playerList={item}
                        teamColor={awayColor}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlayerList;
