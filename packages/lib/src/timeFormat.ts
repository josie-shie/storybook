import dayjs from 'dayjs';

export const timestampToString = (unixTimestamp: number) => {
    return dayjs.unix(unixTimestamp).format('YYYY-M-DD HH:mm:ss');
};
