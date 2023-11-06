'use client';
import { useState, useEffect, useRef } from 'react';
import { handleGameTime } from 'lib';
import style from './gameStatus.module.scss';

function useGameTime({ startTime, status }: { status: number; startTime: string }) {
    const [realTimeStatus, setRealTimeStatus] = useState<{
        time?: number;
        state: string;
        text?: string;
    }>({
        time: 0,
        state: '',
        text: ''
    });

    useEffect(() => {
        setRealTimeStatus(handleGameTime(startTime, status));
    }, [startTime, status]);

    return realTimeStatus;
}

function GameStatus({ startTime, status }: { status: number; startTime: string }) {
    const realTimeStatus = useGameTime({ startTime, status });
    const [realMinute, setRealMinute] = useState(realTimeStatus.time || 0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (status === 1 || status === 3) {
            setRealMinute(realTimeStatus.time || 0);
            timerRef.current = setInterval(() => {
                setRealMinute(preMinute => preMinute + 1);
            }, 60000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [status, realTimeStatus.time]);

    return (
        <div className={style.gameStatus}>
            <p
                className={`${realTimeStatus.time ? style.point : ''} ${
                    style[realTimeStatus.state]
                }`}
            >
                {realMinute || realTimeStatus.text}
            </p>
        </div>
    );
}

export { GameStatus };
