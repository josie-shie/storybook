import dayjs from 'dayjs';

export const timestampToString = (unixTimestamp: number, dateFormat = 'YYYY-M-DD HH:mm:ss') => {
    return dayjs.unix(unixTimestamp).format(dateFormat);
};

export const timestampToMonthDay = (unixTimestamp: number) => {
    return dayjs.unix(unixTimestamp).format('HH:mm');
};
