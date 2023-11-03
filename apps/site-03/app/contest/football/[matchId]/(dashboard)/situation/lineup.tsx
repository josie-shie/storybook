import Image from 'next/image';
import BlueLeftIcon from './img/left_blue.png';
import BlueRightIcon from './img/right_blue.png';
import style from './lineup.module.scss';
import { useSituationStore } from './situationStore';

function Lineup() {
    const lineList = useSituationStore.use.lineupInfo();

    if (lineList.matchId === 0) {
        return null;
    }

    return (
        <div className={style.lineUp}>
            <div className="topBar">
                <h6 className="title">阵容</h6>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th right">{lineList.homeArray.split('').join('-')}</div>
                        <div className="th title">
                            <Image alt="leftIcon" className={style.arrowIcon} src={BlueLeftIcon} />
                            首发阵容
                            <Image
                                alt="rightIcon"
                                className={style.arrowIcon}
                                src={BlueRightIcon}
                            />
                        </div>
                        <div className="th left">{lineList.awayArray.split('').join('-')}</div>
                    </div>
                </div>
                <div className="tableBody">
                    <div className="tr">
                        <ul className="td">
                            {lineList.homeLineup.map(home => (
                                <li className="player" key={home.playerId}>
                                    <p className="number">{home.number}</p>
                                    <p className="name">{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                        <ul className="td">
                            {lineList.awayLineup.map(home => (
                                <li className="player" key={home.playerId}>
                                    <p className="number">{home.number}</p>
                                    <p className="name">{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="tableHead">
                    <div className="tr">
                        <div className="th title">
                            <Image alt="leftIcon" className={style.arrowIcon} src={BlueLeftIcon} />
                            替补阵容
                            <Image
                                alt="rightIcon"
                                className={style.arrowIcon}
                                src={BlueRightIcon}
                            />
                        </div>
                    </div>
                </div>
                <div className="tableBody">
                    <div className="tr">
                        <ul className="td">
                            {lineList.homeBackup.map(home => (
                                <li className="player" key={home.playerId}>
                                    <p className="number">{home.number}</p>
                                    <p className="name">{home.nameChs}</p>
                                </li>
                            ))}
                        </ul>
                        <ul className="td">
                            {lineList.awayBackup.map(home => (
                                <li className="player" key={home.playerId}>
                                    <p className="number">{home.number}</p>
                                    <p className="name">{home.nameChs}</p>
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
