'use client';
import dayjs from 'dayjs';

// const HALF_BREAK_TIME = 15;

export const handleStartTime = (startTime: number, endTime?: number) => {
    if (!startTime) return 0;
    const start = dayjs(startTime * 1000);
    const end = endTime ? dayjs(endTime * 1000) : dayjs();
    const diffMinutes = end.diff(start, 'minute');
    return diffMinutes;
};

export const handleGameTime = (
    startTime: number,
    state: number,
    endTime?: number
): {
    state:
        | 'notYet'
        | 'playing'
        | 'midfielder'
        | 'playoff'
        | 'kick'
        | 'finish'
        | 'cancel'
        | 'undetermined'
        | 'cut'
        | 'discontinue'
        | 'putOff'
        | 'unknow';
    time?: number;
    text?: string;
} => {
    if (state === 0) {
        return { state: 'notYet', text: '未' };
    }
    if (state === 1) {
        return { state: 'playing', time: handleStartTime(startTime, endTime) };
    }
    if (state === 2) {
        return { state: 'midfielder', text: '中场' };
    }
    if (state === 3) {
        return { state: 'playing', time: handleStartTime(startTime, endTime) + 45 };
    }
    if (state === 4) {
        return { state: 'playoff', text: '加' };
    }
    if (state === 5) {
        return { state: 'kick', text: '点' };
    }
    if (state === -1) {
        return { state: 'finish', text: '完' };
    }
    if (state === -10) {
        return { state: 'cancel', text: '取消' };
    }
    if (state === -11) {
        return { state: 'undetermined', text: '待' };
    }
    if (state === -12) {
        return { state: 'cut', text: '腰斩' };
    }
    if (state === -13) {
        return { state: 'discontinue', text: '中断' };
    }
    if (state === -14) {
        return { state: 'putOff', text: '推迟' };
    }
    return { state: 'unknow', text: '未知' };
};

export const handleMatchDateTime = (startTime: number) => {
    if (!startTime) return '';
    const inputDate = dayjs(startTime * 1000);
    const now = dayjs();

    if (now.format('YYYY/MM/DD') === inputDate.format('YYYY/MM/DD')) {
        return inputDate.format('HH:mm');
    }

    return inputDate.format('MM/DD HH:mm');
};
