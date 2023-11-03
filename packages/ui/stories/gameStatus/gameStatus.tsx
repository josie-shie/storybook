import { handleGameTime } from 'lib';
import style from './gameStatus.module.scss';

function GameStatus({ startTime, status }: { status: number; startTime: string }) {
    const realTimeStatus = handleGameTime(startTime, status);

    return (
        <div className={style.gameStatus}>
            {realTimeStatus.time ? (
                <p className={style.point}>{realTimeStatus.time}‘</p>
            ) : (
                <p className={style[realTimeStatus.state]}>{realTimeStatus.text}</p>
            )}
        </div>
    );
}

export { GameStatus };
