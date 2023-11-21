'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { registerLocale } from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import 'dayjs/locale/zh-cn';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContestFilter from '../contestFilter/filter';
import style from './baseDatePicker.module.scss';
import FilterIcon from './img/filter.png';

registerLocale('zh-CN', zhCN);

type DateDirection = 'schedule' | 'result';

interface BaseDatePickerProps {
    direction?: DateDirection;
    onDateChange?: (date: Date) => void;
    defaultDate: Date;
}

const MONTH_DAY = 'MM-DD';

function DateLabel({ date }: { date: dayjs.Dayjs }) {
    if (date.format(MONTH_DAY) === dayjs().format(MONTH_DAY)) {
        return <div className={style.tabDate}>今日</div>;
    }

    return (
        <div>
            <div className={style.tabDate}>{date.format(MONTH_DAY)}</div>
            <div className={style.tabTitle}>{date.locale('zh-cn').format('dddd')}</div>
        </div>
    );
}

function BaseDatePicker({
    direction = 'schedule',
    onDateChange,
    defaultDate
}: BaseDatePickerProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [tab, setTab] = useState(direction === 'schedule' ? 0 : 5);
    const [dates, setDates] = useState(() => {
        const arr = Array.from({ length: 6 }).map((_, index) => {
            const adjustedDay = direction === 'schedule' ? index : index - 5;
            return dayjs().add(adjustedDay, 'day');
        });
        return arr;
    });

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleOpenModal = () => {
        router.push(`${pathname}?${createQueryString('filter', 'open')}`);
    };
    const handleDateSelection = useCallback(
        (selectedDate: Date) => {
            const selectedDay = dayjs(selectedDate);
            const existingDateIndex = dates.findIndex(
                date => date.format(MONTH_DAY) === selectedDay.format(MONTH_DAY)
            );

            let newTabIndex: number;

            if (existingDateIndex !== -1) {
                newTabIndex = existingDateIndex;
            } else {
                if (direction === 'schedule') {
                    dates[dates.length - 1] = selectedDay;
                    newTabIndex = dates.length - 1;
                } else {
                    dates[0] = selectedDay;
                    newTabIndex = 0;
                }
                setDates([...dates]);
            }
            setTab(newTabIndex);
        },
        [dates, direction]
    );

    useEffect(() => {
        handleDateSelection(dayjs(defaultDate).isValid() ? defaultDate : new Date());
    }, [dates, defaultDate, direction, handleDateSelection]);

    return (
        <>
            <Box className={style.baseDatePicker}>
                <Tabs
                    className={style.tabs}
                    onChange={(event, newTab: number) => {
                        setTab(newTab);
                        onDateChange && onDateChange(dates[newTab].toDate());
                    }}
                    value={tab}
                    variant="fullWidth"
                >
                    {dates.map((date, index) => (
                        <Tab key={`${index + 1}`} label={<DateLabel date={date} />} />
                    ))}
                </Tabs>
                <IconButton onClick={handleOpenModal}>
                    <Image alt="" height={16} src={FilterIcon} width={16} />
                    <span>筛选</span>
                </IconButton>
            </Box>
            <ContestFilter />
        </>
    );
}

export default BaseDatePicker;
