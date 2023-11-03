'use client';
import { handleGameTime } from 'lib';
import style from './gameStatus.module.scss';

function GameStatus({ startTime, status }: { status: number; startTime: string }) {
    const realTimeStatus = handleGameTime(startTime, status);

    return (
        <div className={style.gameStatus}>
            <p className={realTimeStatus.time ? style.point : style[realTimeStatus.state]}>
                {realTimeStatus.time || realTimeStatus.text}
            </p>
        </div>
    );
}

export { GameStatus };
