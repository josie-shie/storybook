'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import type { ContestInfo } from 'data-center';
import { handleGameTime, soundDefault, soundSource, mqttService } from 'lib';
import style from './goalAlert.module.scss';
import Football from './img/football.png';
import { useContestListGlobalStore } from './contestListGlobalStore';
import { useContestInfoStore } from './contestInfoStore';

function GoalAlert() {
    const [alertList, setAlertList] = useState<ContestInfo[]>([]);
    const firstTimeRef = useRef(true);

    useEffect(() => {
        if (!firstTimeRef.current) return;
        firstTimeRef.current = false;
        const soundSourceMap: Record<string, HTMLAudioElement> = {};
        for (const [key, value] of Object.entries(soundSource)) {
            soundSourceMap[key] = new Audio(value);
        }
        const handleAlertInfo = (data: ContestInfo) => {
            const soundData = {
                openTip: Boolean(localStorage.getItem('openTip')),
                openSound: Boolean(localStorage.getItem('openSound')),
                homeSound: localStorage.getItem('homeSound') || soundDefault.homeSound,
                awaySound: localStorage.getItem('awaySound') || soundDefault.awaySound
            };
            if ((!data.awayScore && !data.homeScore) || !soundData.openTip) return;
            const globalStore = useContestListGlobalStore.getState().contestInfo;
            const currentInfoStore = useContestInfoStore.getState().contestInfo;
            const contestInfo = globalStore[data.matchId];
            const currentContestInfo = currentInfoStore[data.matchId];
            if (soundData.openSound) {
                if (data.homeScore) void soundSourceMap[soundData.homeSound].play();
                if (data.awayScore) void soundSourceMap[soundData.awaySound].play();
            }

            setAlertList(prev => [...prev, { ...contestInfo, ...currentContestInfo, ...data }]);
            setTimeout(() => {
                setAlertList(prev => prev.slice(1));
            }, 10000);
        };
        mqttService.getMessage(handleAlertInfo);
    }, []);

    const clearAlert = () => {
        setAlertList([]);
    };

    const getStartTime = (startTime: number, state: number) => {
        const { time } = handleGameTime(startTime, state);
        return time;
    };

    return (
        <div className={style.goalAlert}>
            {alertList.length > 0 && (
                <div className={style.alertList} onClick={clearAlert}>
                    {alertList.map((item, idx) => {
                        return (
                            <div
                                className={style.box}
                                key={item.matchId}
                                style={{ transform: `translateY(-${idx * 80}px)` }}
                            >
                                <div className={style.left}>
                                    <Image
                                        alt="football"
                                        className={style.footballImg}
                                        src={Football}
                                    />
                                    <div className={style.info}>
                                        <p>{getStartTime(item.startTime, item.state)}&apos;</p>
                                        <p>進球</p>
                                    </div>
                                    <div className={style.line} />
                                </div>
                                <div className={style.right}>
                                    <div className={style.team}>
                                        <div className={style.info}>
                                            <p className={style.name}>{item.awayChs}</p>
                                            <p className={style.score}>{item.awayScore}</p>
                                        </div>
                                        <div className={style.info}>
                                            <p className={style.name}>{item.homeChs}</p>
                                            <p className={style.score}>{item.homeScore}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* <div className={style.alertList} onClick={clearAlert}>
                <div
                    className={style.box}
                    key="test"
                    style={{ transform: `translateY(-${1 * 80}px)` }}
                >
                    <div className={style.left}>
                        <Image
                            alt="football"
                            className={style.footballImg}
                            height={20}
                            src={Football}
                            width={20}
                        />
                        <div className={style.info}>
                            <p>{getStartTime(1700202000, 1)}&apos;</p>
                            <p>進球</p>
                        </div>
                        <div className={style.line} />
                    </div>
                    <div className={style.right}>
                        <div className={style.team}>
                            <div className={style.info}>
                                <p className={style.name}>我是主隊</p>
                                <p className={style.score}>{1}</p>
                            </div>
                            <div className={style.info}>
                                <p className={style.name}>我是客隊</p>
                                <p className={style.score}>{2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default GoalAlert;
