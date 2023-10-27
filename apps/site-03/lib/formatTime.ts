import dayjs from 'dayjs';

export function formatTime(timestamp: number, format: string) {
    return dayjs(timestamp * 1000).format(format);
}
