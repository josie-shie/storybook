'use client';
import { useState, useEffect, useRef } from 'react';
import { handleGameTime } from 'lib';
import style from './gameStatus.module.scss';

interface GameStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    status: number;
    startTime: string;
    injuryTime?: string;
}

function useGameTime({ startTime, status }: GameStatusProps) {
    const [realTimeStatus, setRealTimeStatus] = useState<{
        time?: number;
        state: string;
        text?: string;
    }>({ time: undefined, state: '', text: '' });
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    useEffect(() => {
        setRealTimeStatus(handleGameTime(startTime, status));
        if (status === 1 || status === 3) {
            timerRef.current = setInterval(() => {
                setTriggerUpdate(u => !u);
            }, 30000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [startTime, status, triggerUpdate]);

    return realTimeStatus;
}

function GameStatus({ startTime, status, injuryTime = '', ...props }: GameStatusProps) {
    const realTimeStatus = useGameTime({ startTime, status });

    return (
        <div className={style.gameStatus} {...props}>
            <p
                className={`${realTimeStatus.time ? style.point : ''} ${
                    style[realTimeStatus.state]
                }`}
            >
                {realTimeStatus.time || realTimeStatus.text}
                {Number(injuryTime) > 0 ? `+${injuryTime}'` : ''}
            </p>
        </div>
    );
}

export { GameStatus };
