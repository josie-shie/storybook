import dayjs from 'dayjs';
import style from './oddsDetailDrawer.module.scss';

function handleGameTime(startTime: string, state: number, endTime?: number | string) {
    if (state === 0) return { state: 'notYet' };
    if (state === 1) {
        return { state: 'playing', time: handleStartTime(startTime, endTime) };
    }
    if (state === 2) {
        return { state: 'midfielder' };
    }
    if (state === 3) {
        return { state: 'playing', time: handleStartTime(startTime, endTime) + 45 };
    }
    if (state === 4) {
        return { state: 'playoff' };
    }
    if (state === 5) {
        return { state: 'kick' };
    }
    if (state === -1) {
        return { state: 'finish' };
    }
    if (state === -10) {
        return { state: 'cancel' };
    }
    if (state === -11) {
        return { state: 'undetermined' };
    }
    if (state === -12) {
        return { state: 'cut' };
    }
    if (state === -13) {
        return { state: 'discontinue' };
    }
    if (state === -14) {
        return { state: 'putOff' };
    }
    return { state: 'unknow' };
}

function handleStartTime(startTime: string, endTime?: number | string) {
    if (!startTime) return 0;
    const start = dayjs(startTime);
    const end = endTime ? dayjs(endTime) : dayjs();
    const diffMinutes = end.diff(start, 'minute');

    return diffMinutes;
}

function GameStatus({
    startTime,
    endTime,
    state
}: {
    startTime?: string;
    endTime?: string;
    state?: number;
}) {
    const gameStatus = handleGameTime(startTime || '', state || 0, endTime || '');
    const stateStyle: Record<string, { style: string; text: string }> = {
        notYet: { style: style.notYet, text: '未' },
        midfielder: { style: style.notYet, text: '中场' },
        finish: { style: style.finish, text: '完场' },
        playoff: { style: style.playoff, text: '加' }
    };

    return (
        <p className={`${style.gameTime} ${stateStyle[gameStatus.state].style || ''}`}>
            {stateStyle[gameStatus.state].text || (
                <>
                    {gameStatus.time} <span>&apos;</span>
                </>
            )}
        </p>
    );
}

export default GameStatus;
