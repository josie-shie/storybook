import Image from 'next/image';
import { useSituationStore } from '../../situationStore';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './event.module.scss';
import ClockIcon from './img/clock.png';
import YellowCardIcon from './img/yellow_card.png';
import RedCardIcon from './img/red_card.png';
import SwapIcon from './img/swap.png';
import GoalIcon from './img/goal.png';
import PenaltyIcon from './img/penalty.png';
import OwnIcon from './img/own.png';
import YellowsTurnRedIcon from './img/yellow_turn_red.png';
import MissedIcon from './img/missed.png';
import VideoIcon from './img/video.png';

function GameEvent() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    // const eventList = useSituationStore.use.eventList();
    // const eventInfo = useSituationStore.use.eventInfo();
    const eventList = useSituationStore.use.eventList();
    const swapEvent = (name: string, offName: string) => {
        return (
            <div className="swapPlayer">
                <p className="name">{name}</p>
                <p className="name">{offName}</p>
            </div>
        );
    };

    const captionInfo = [
        {
            id: 0,
            label: '进球',
            image: <Image alt="GoalIcon" height={17} src={GoalIcon} width={16} />
        },
        {
            id: 1,
            label: '点球',
            image: <Image alt="PenaltyIcon" height={17} src={PenaltyIcon} width={16} />
        },
        {
            id: 2,
            label: '乌龙球',
            image: <Image alt="OwnIcon" height={17} src={OwnIcon} width={16} />
        },
        {
            id: 3,
            label: '两黄变红',
            image: (
                <Image alt="YellowsTurnRedIcon" height={17} src={YellowsTurnRedIcon} width={16} />
            )
        },
        {
            id: 4,
            label: '射失点球',
            image: <Image alt="MissedIcon" height={17} src={MissedIcon} width={16} />
        },
        {
            id: 5,
            label: '换人',
            image: <Image alt="SwapIcon" height={17} src={SwapIcon} width={16} />
        },
        {
            id: 6,
            label: '视频裁判',
            image: <Image alt="VideoIcon" height={17} src={VideoIcon} width={16} />
        }
    ];

    const kindIconMap = {
        1: <Image alt="GoalIcon" height={17} src={GoalIcon} width={16} />,
        2: <Image alt="RedCardIcon" height={17} src={RedCardIcon} width={16} />,
        3: <Image alt="YellowCardIcon" height={17} src={YellowCardIcon} width={16} />,
        7: <Image alt="PenaltyIcon" height={17} src={PenaltyIcon} width={16} />,
        8: <Image alt="OwnIcon" height={17} src={OwnIcon} width={16} />,
        9: <Image alt="YellowsTurnRedIcon" height={17} src={YellowsTurnRedIcon} width={16} />,
        11: <Image alt="SwapIcon" height={17} src={SwapIcon} width={16} />,
        13: <Image alt="MissedIcon" height={17} src={MissedIcon} width={16} />,
        14: <Image alt="VideoIcon" height={17} src={VideoIcon} width={16} />
    };

    return (
        <div className={style.gameEvent}>
            <div className="topBar">
                <h6 className="title">比赛事件</h6>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th right">{matchDetail.homeChs}</div>
                        <div className="th icon">
                            <Image alt="" height={24} src={ClockIcon} width={24} />
                        </div>
                        <div className="th left">{matchDetail.awayChs}</div>
                    </div>
                </div>
                <div className="tableBody">
                    <div className="tr">
                        <div className="td">
                            {eventList.length > 0 ? (
                                <div className="timeLine">
                                    {eventList.map(event => (
                                        <div className="timeEvent" key={event.matchId}>
                                            <div className="left">
                                                {event.isHome ? (
                                                    <>
                                                        {event.kind === 11
                                                            ? swapEvent(
                                                                  event.nameChs,
                                                                  event.nameChs2
                                                              )
                                                            : event.nameChs}
                                                        {kindIconMap[event.kind]}
                                                    </>
                                                ) : null}
                                            </div>

                                            <div className="time">{event.time}&#39;</div>

                                            <div className="right">
                                                {!event.isHome && (
                                                    <>
                                                        {event.kind === 11
                                                            ? swapEvent(
                                                                  event.nameChs,
                                                                  event.nameChs2
                                                              )
                                                            : event.nameChs}
                                                        {kindIconMap[event.kind]}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                '暂无数据'
                            )}
                        </div>
                    </div>
                    <div className="tr">
                        <div className="td">
                            <ul className="caption">
                                {captionInfo.map(info => (
                                    <li className="info" key={info.id}>
                                        {info.image}
                                        <p className="label">{info.label}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameEvent;
