'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import type { ContestInfo } from 'data-center';
import { handleGameTime, soundDefault, soundSource, mqttService } from 'lib';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useContestListGlobalStore } from '@/store/contestListGlobalStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import style from './goalAlert.module.scss';
import Football from './img/football.png';

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
            const liveContestStore = useLiveContestStore.getState().contestInfo;
            const contestInfo = globalStore[data.matchId];
            const currentContestInfo = liveContestStore[data.matchId];
            if (soundData.openSound) {
                if (data.homeScore) void soundSourceMap[soundData.homeSound].play();
                if (data.awayScore) void soundSourceMap[soundData.awaySound].play();
            }
            setAlertList(prev => {
                const updatedList = [...prev, { ...contestInfo, ...currentContestInfo, ...data }];

                if (updatedList.length <= 7) {
                    setTimeout(() => {
                        setAlertList(prevInner => prevInner.slice(1));
                    }, 4500);
                } else if (updatedList.length > 7) {
                    updatedList.shift();
                }

                return updatedList;
            });
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
                    <AnimatePresence>
                        {alertList.map(item => {
                            return (
                                <motion.div
                                    animate={{ y: 0, opacity: 1 }}
                                    className={style.box}
                                    exit={{
                                        y: 50,
                                        opacity: 0,
                                        zIndex: -1
                                    }}
                                    initial={{ y: 50, opacity: 0 }}
                                    key={item.matchId}
                                    layout
                                    style={{ position: 'relative', zIndex: 1 }}
                                    transition={{ ease: 'easeOut', duration: 0.3 }}
                                >
                                    <div className={style.left}>
                                        <Image
                                            alt="football"
                                            className={style.footballImg}
                                            height={32}
                                            src={Football}
                                            width={32}
                                        />
                                        <div className={style.info}>
                                            <p>進球</p>
                                            <p>
                                                {getStartTime(
                                                    item.state === 1
                                                        ? item.startTime
                                                        : item.halfStartTime,
                                                    item.state
                                                )}
                                                ′
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style.right}>
                                        <div className={style.team}>
                                            <div className={style.info}>
                                                <div className={style.card}>
                                                    {item.homeRed ? (
                                                        <p className={style.redCard}>
                                                            {item.homeRed}
                                                        </p>
                                                    ) : null}
                                                    {item.homeYellow ? (
                                                        <p className={style.yellowCard}>
                                                            {item.homeYellow}
                                                        </p>
                                                    ) : null}
                                                </div>
                                                <p className={style.name}>{item.homeChs}</p>
                                                <div className={style.scoreBar}>
                                                    <TeamLogo
                                                        alt={item.homeChs}
                                                        className={style.footballImg}
                                                        height={20}
                                                        src={item.homeLogo}
                                                        width={20}
                                                    />
                                                    <p className={style.score}>{item.homeScore}</p>
                                                </div>
                                            </div>
                                            <div className={style.info}>
                                                <div className={style.card}>
                                                    {item.awayRed ? (
                                                        <p className={style.redCard}>
                                                            {item.awayRed}
                                                        </p>
                                                    ) : null}
                                                    {item.awayYellow ? (
                                                        <p className={style.yellowCard}>
                                                            {item.awayYellow}
                                                        </p>
                                                    ) : null}
                                                </div>
                                                <p className={style.name}>{item.awayChs}</p>
                                                <div className={style.scoreBar}>
                                                    <TeamLogo
                                                        alt={item.awayChs}
                                                        className={style.footballImg}
                                                        height={20}
                                                        src={item.awayLogo}
                                                        width={20}
                                                    />
                                                    <p className={style.score}>{item.awayScore}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default GoalAlert;
