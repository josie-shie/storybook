import dayjs from 'dayjs';

export const timestampToString = (unixTimestamp: number, dateFormat = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs.unix(unixTimestamp).format(dateFormat);
};

export const timestampToMonthDay = (unixTimestamp: number) => {
    return dayjs.unix(unixTimestamp).format('HH:mm');
};

export const timestampToTodayTime = (unixTimestamp: number) => {
    const date = dayjs.unix(unixTimestamp);
    const today = dayjs();

    if (date.isSame(today, 'day')) {
        return `今天 ${date.format('HH:mm')}截止`;
    }
    return date.format('MM-DD HH:mm');
};
