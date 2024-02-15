'use client';
import type { EventInfo } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './event.module.scss';
import { eventStatusMap } from './eventStatusMap';
import ClockIcon from './img/clock.svg';

function InjuryTime() {
    return (
        <>
            <div className={style.left} />
            <div className={`${style.timeBox} ${style.injuryTime}`}>
                <div className={style.time}>伤停补时</div>
            </div>
            <div className={style.right} />
        </>
    );
}

function EndTime() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useLiveContestStore.use.contestInfo();

    const syncData = Object.hasOwnProperty.call(globalStore, matchDetail.matchId)
        ? globalStore[matchDetail.matchId]
        : {};
    return (
        <>
            <div className={style.left} />
            <div className={style.matchStatus}>
                <ClockIcon />
                <p className={style.text}>
                    結束 {syncData.homeScore || matchDetail.homeScore}-
                    {syncData.awayScore || matchDetail.awayScore}
                </p>
            </div>
            <div className={style.right} />
        </>
    );
}

function EventCard({ event }: { event: EventInfo }) {
    const handleNoName = (name: string) => {
        if (name === '0') {
            return '';
        }
        return name;
    };

    const swapEvent = (name: string, offName: string) => {
        return (
            <div className={style.swapPlayer}>
                <p className={style.name}>{handleNoName(name)}</p>
                <p className={style.name}>{handleNoName(offName)}</p>
            </div>
        );
    };

    return (
        <>
            <div className={`${style.left} ${event.isHome && style.isData}`}>
                {event.isHome ? (
                    <>
                        {event.kind === 11
                            ? swapEvent(event.nameChs, event.nameChs2)
                            : handleNoName(event.nameChs)}
                        <div className={style.icon}>{eventStatusMap[event.kind] || 'here'}</div>
                    </>
                ) : null}
            </div>

            <div className={style.timeBox}>
                <div className={style.time}>{event.time}′</div>
            </div>

            <div className={`${style.right} ${!event.isHome && style.isData}`}>
                {!event.isHome && (
                    <>
                        {event.kind === 11
                            ? swapEvent(event.nameChs, event.nameChs2)
                            : handleNoName(event.nameChs)}
                        <div className={style.icon}>{eventStatusMap[event.kind] || 'here'}</div>
                    </>
                )}
            </div>
        </>
    );
}

function Event({ eventList }: { eventList: EventInfo[] }) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useLiveContestStore.use.contestInfo();

    const syncData = Object.hasOwnProperty.call(globalStore, matchDetail.matchId)
        ? globalStore[matchDetail.matchId]
        : {};
    const matchStatus = syncData.state || matchDetail.state;
    const showMatchStart = (matchStatus > 0 && matchStatus < 5) || matchStatus === -1;
    return (
        <>
            {eventList.length > 0 || showMatchStart ? (
                <ul className={style.timeLine}>
                    <div className={style.matchStatus}>
                        <ClockIcon />
                        <p className={style.text}>比赛开始</p>
                    </div>
                    {eventList.map((event, idx) => (
                        <li className={style.timeEvent} key={`event_${idx.toString()}`}>
                            {event.kind === 6 && <InjuryTime />}
                            {event.kind === 5 && <EndTime />}

                            {event.kind !== 5 && event.kind !== 6 && <EventCard event={event} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default Event;
