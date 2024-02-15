'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { handleGameTime } from 'lib';
import style from './gameStatus.module.scss';

interface GameStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    status: number;
    startTime: number;
}

function useGameTime({ startTime, status }: GameStatusProps) {
    const [realTimeStatus, setRealTimeStatus] = useState<{
        time?: string;
        state: string;
        text?: string;
    }>({ time: undefined, state: '', text: '' });
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimer = useCallback(() => {
        if (status === 1 || status === 3) {
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    setRealTimeStatus(handleGameTime(startTime, status));
                }, 10000);
            }
        }
    }, [startTime, status]);

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === 'visible') {
            startTimer();
        } else {
            stopTimer();
        }
    }, [startTimer]);

    useEffect(() => {
        setRealTimeStatus(handleGameTime(startTime, status));
        startTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            stopTimer();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleVisibilityChange, startTime, startTimer, status]);

    return realTimeStatus;
}

function GameStatus({ startTime, status, ...props }: GameStatusProps) {
    const realTimeStatus = useGameTime({ startTime, status });

    return (
        <div className={`${style.gameStatus} ui-game-status`} {...props}>
            <p
                className={`${realTimeStatus.time ? style.point : ''} ${
                    style[realTimeStatus.state]
                }`}
            >
                {realTimeStatus.time || realTimeStatus.text}
                {realTimeStatus.state === 'playing' && (
                    <span className={style.flashing}>&apos;</span>
                )}
            </p>
        </div>
    );
}

export { GameStatus };
