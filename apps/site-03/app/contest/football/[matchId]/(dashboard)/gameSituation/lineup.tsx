import BlueLeftIcon from './img/left_blue.svg';
import BlueRightIcon from './img/right_blue.svg';
import style from './gameStatus.module.scss';
import type { LineupList } from '@/types/detailStatus';

function Lineup({ lineList }: { lineList?: LineupList }) {
    return (
        <div className={style.lineUp}>
            <div className={style.topBar}>
                <h6>
                    <span className={style.blueIcon} />
                    阵容
                </h6>
            </div>
            <div className={style.scoreTable}>
                <div className={style.tableHead}>
                    <div className={`${style.th} ${style.right}`}>
                        {lineList?.homeArray.split('').join('-')}
                    </div>
                    <div className={`${style.th} ${style.title}`}>
                        <BlueLeftIcon />
                        首发阵容
                        <BlueRightIcon />
                    </div>
                    <div className={`${style.th} ${style.left}`}>
                        {lineList?.awayArray.split('').join('-')}
                    </div>
                </div>
                <div className={style.tableBody}>
                    <div className={style.tr}>
                        <ul className={style.td}>
                            {lineList?.homeLineup.map(home => (
                                <li className={style.player} key={home.playerId}>
                                    <p className={style.number}>{home.number}</p>
                                    <p className={style.name}>{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                        <ul className={style.td}>
                            {lineList?.awayLineup.map(home => (
                                <li className={style.player} key={home.playerId}>
                                    <p className={style.number}>{home.number}</p>
                                    <p className={style.name}>{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={style.tableHead}>
                    <div className={`${style.th} ${style.title}`}>
                        <BlueLeftIcon />
                        替补阵容
                        <BlueRightIcon />
                    </div>
                </div>
                <div className={style.tableBody}>
                    <div className={style.tr}>
                        <ul className={style.td}>
                            {lineList?.homeBackup.map(home => (
                                <li className={style.player} key={home.playerId}>
                                    <p className={style.number}>{home.number}</p>
                                    <p className={style.name}>{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                        <ul className={style.td}>
                            {lineList?.awayBackup.map(home => (
                                <li className={style.player} key={home.playerId}>
                                    <p className={style.number}>{home.number}</p>
                                    <p className={style.name}>{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lineup;
