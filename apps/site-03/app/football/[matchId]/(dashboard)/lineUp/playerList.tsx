'use client';
import Coat from './img/coat.png';
import ChangeUp from './img/changeUp.svg';
import Ball from './img/ball.svg';
import RedCard from './img/redCard.svg';
import YellowCard from './img/yellowCard.svg';
import Support from './img/support.svg';
import Winner from './img/winner.svg';
import style from './playerList.module.scss';

interface PlayerItemProps {
    name: string;
    score: string;
    scoreColor: string;
    teamColor: string;
    isLeft?: boolean;
}

function PlayerItem({ name, score, scoreColor, teamColor, isLeft }: PlayerItemProps) {
    return (
        <div className={`${style.playerItem} ${isLeft ? style.rightLine : ''}`}>
            <div className={style.detail}>
                <div className={style.left} style={{ backgroundColor: teamColor }}>
                    <div className={style.coat} style={{ backgroundImage: `url(${Coat.src})` }}>
                        8
                    </div>
                </div>
                <div className={style.substitute}>
                    <div className={style.nameScore}>
                        <p className={style.name}>{name}</p>
                        <div className={style.score}>
                            <p className={style.position}>中場</p>
                            <div className={style.tag} style={{ backgroundColor: scoreColor }}>
                                {score}
                            </div>
                            <YellowCard />
                        </div>
                    </div>
                    <div className={style.time}>
                        <ChangeUp width={20} height={20} />
                        <span>69'</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlayerList() {
    const playerData = [
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(196, 0, 16)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(196, 0, 16)'
        }
    ];

    const playerDataBottom = [
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(118, 207, 131)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(142, 186, 219)'
        },
        {
            name: '尤爾曼',
            score: '6.37',
            scoreColor: 'rgb(14, 134, 4)',
            teamColor: 'rgb(142, 186, 219)'
        }
    ];

    return (
        <div className={style.playerList}>
            <div className={style.container}>
                {playerData.map((item, index) => (
                    <PlayerItem key={index} {...item} isLeft={true} />
                ))}
            </div>
            <div className={style.container}>
                {playerDataBottom.map((item, index) => (
                    <PlayerItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export default PlayerList;
