import dayjs from 'dayjs';

export function handleMatchDateTime(startTime: string) {
    if (!startTime) return '';
    const inputDate = dayjs.unix(parseInt(startTime));
    const now = dayjs();

    if (now.format('YYYY/MM/DD') === inputDate.format('YYYY/MM/DD')) {
        return inputDate.format('HH:mm');
    }

    return inputDate.format('MM/DD HH:mm');
}
