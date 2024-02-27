import dayjs from 'dayjs';

export const timestampToStringCh = (unixTimestamp: number, dateFormat = 'YYYY年MM月DD日') => {
    return dayjs.unix(unixTimestamp).format(dateFormat);
};

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

export const daysFromToday = (unixTimestamp: number, targetUnixTimestamp?: number): string => {
    const date = dayjs.unix(unixTimestamp);
    let targetDate = targetUnixTimestamp ? dayjs.unix(targetUnixTimestamp) : dayjs();

    if (date.isAfter(targetDate)) {
        targetDate = targetDate.add(1, 'day');
    }

    const diffDays = targetDate.diff(date, 'day');
    const result = `${Math.abs(diffDays)}天`;

    return result;
};

export const timestampToStringWeek = (unixTimestamp: number) => {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const week = weekdays[new Date(unixTimestamp * 1000).getDay()];

    return `${dayjs.unix(unixTimestamp).format('YYYY-MM-DD')} ${week}`;
};
