'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import type { ContestInfo } from 'data-center';
import { handleGameTime, soundDefault, soundSource, mqttService } from 'lib';
import type { PanInfo } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useContestListGlobalStore } from '@/store/contestListGlobalStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import style from './goalAlert.module.scss';
import Football from './img/football.png';

function GoalAlert() {
    const [alertList, setAlertList] = useState<ContestInfo[]>([]);
    const firstTimeRef = useRef(true);
    const screenWidth = useRef(0);

    const [startX, setStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);

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
            // eslint-disable-next-line no-console -- Check goal event
            console.log('goal', data);
            const globalStore = useContestListGlobalStore.getState().contestInfo;
            const liveContestStore = useLiveContestStore.getState().contestInfo;
            const contestInfo = globalStore[data.matchId];
            const currentContestInfo = liveContestStore[data.matchId];
            if (soundData.openSound) {
                if (data.homeScore) void soundSourceMap[soundData.homeSound].play();
                if (data.awayScore) void soundSourceMap[soundData.awaySound].play();
            }

            if (typeof contestInfo === 'undefined') {
                return;
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
        screenWidth.current = window.innerWidth;
        mqttService.getMessage(handleAlertInfo);
    }, []);

    const removeAlert = (matchId: number) => {
        setAlertList(prevList => prevList.filter(matchInfo => matchInfo.matchId !== matchId));
    };

    const getStartTime = (startTime: number, state: number) => {
        const { time } = handleGameTime(startTime, state);
        return time;
    };

    const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setStartX(info.point.x);
        setIsDragging(true);
    };

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (startX === null) return;

        if (info.point.x < startX && isDragging) {
            setIsDragging(false);
        }

        const swipeDistance = Math.abs(info.point.x - startX);
        const swipePercentage = swipeDistance / screenWidth.current;
        const newOpacity = Math.max(1 - swipePercentage * 1.5, 0);

        setOpacity(newOpacity);
    };

    const handleDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
        matchId: number
    ) => {
        const swipeDistance = startX !== null ? Math.abs(info.point.x - startX) : 0;
        const swipePercentage = (swipeDistance / screenWidth.current) * 100;

        setIsDragging(false);
        setStartX(null);
        setOpacity(1);

        if (swipePercentage > 60) {
            removeAlert(matchId);
        }
    };

    return (
        <div className={style.goalAlert}>
            <div className={style.alertList}>
                <AnimatePresence>
                    {alertList.map((item, idx) => {
                        return (
                            <motion.div
                                animate={{ y: 0, opacity: 1 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.6}
                                exit={{
                                    x: screenWidth.current,
                                    opacity: 0,
                                    zIndex: -1
                                }}
                                initial={{ y: 50, opacity: 0 }}
                                key={`${item.matchId}${idx.toString()}`}
                                layout
                                onDrag={handleDrag}
                                onDragEnd={(event, info) => {
                                    handleDragEnd(event, info, item.matchId);
                                }}
                                onDragStart={handleDragStart}
                                style={{ position: 'relative', zIndex: 1, opacity }}
                                transition={{ ease: 'easeOut', duration: 0.3 }}
                            >
                                <Link className={style.box} href={`/football/${item.matchId}`}>
                                    <div className={style.left}>
                                        <Image
                                            alt="football"
                                            className={style.footballImg}
                                            height={32}
                                            src={Football}
                                            width={32}
                                        />
                                        <div className={style.info}>
                                            <p>进球</p>
                                            <p>
                                                {getStartTime(
                                                    item.state > 2
                                                        ? item.halfStartTime
                                                        : item.startTime,
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
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default GoalAlert;
