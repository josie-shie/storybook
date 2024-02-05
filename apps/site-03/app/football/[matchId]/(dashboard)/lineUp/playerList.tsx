'use client';
import Coat from './img/coat.png';
import ChangeUp from './img/changeUp.svg';
import Ball from './img/ball.svg';
import RedCard from './img/redCard.svg';
import YellowCard from './img/yellowCard.svg';
import Support from './img/support.svg';
import Winner from './img/winner.svg';
import style from './playerList.module.scss';
import type { PlayerList } from 'data-center';

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
    isLeft?: boolean;
}

function PlayerItem({ playerList, teamColor, formation, isLeft = false }: PlayerItemProps) {
    const firstCharOfFormation = formation[0];

    const getPositionName = (formation: string, position: number): string => {
        let positionsMap: string[];

        switch (formation) {
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
        <div className={`${style.playerItem} ${isLeft ? style.rightLine : ''}`}>
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
                        key={item.playerId}
                        playerList={item}
                        teamColor={homeColor}
                        formation={homeFormation}
                        isLeft={true}
                    />
                ))}
            </div>
            <div className={style.container}>
                {awayBackUp.map(item => (
                    <PlayerItem
                        key={item.playerId}
                        playerList={item}
                        teamColor={awayColor}
                        formation={awayFormation}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlayerList;
