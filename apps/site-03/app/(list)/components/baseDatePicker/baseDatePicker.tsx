'use client';
import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import 'dayjs/locale/zh-cn';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import style from './baseDatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DateIcon from './img/date.svg';

registerLocale('zh-CN', zhCN);

type DateDirection = 'schedule' | 'result';

interface BaseDatePickerProps {
    direction?: DateDirection;
    onDateChange?: (date: Date) => void;
    defaultDate: Date;
}

const MONTH_DAY = 'MM/DD';

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
    const [tab, setTab] = useState(direction === 'schedule' ? 0 : 5);
    const [openModal, setOpenModal] = useState(false);
    const [pickerDate, setPickerDate] = useState<Date | null>(new Date());
    const [dates, setDates] = useState(() => {
        const arr = Array.from({ length: 6 }).map((_, index) => {
            const adjustedDay = direction === 'schedule' ? index : index - 5;
            return dayjs().add(adjustedDay, 'day');
        });
        return arr;
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
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

    const handleConfirmDate = () => {
        if (pickerDate) {
            handleDateSelection(pickerDate);
            onDateChange && onDateChange(pickerDate);
            setOpenModal(false);
        }
    };

    useEffect(() => {
        handleDateSelection(dayjs(defaultDate).isValid() ? defaultDate : new Date());
    }, [dates, defaultDate, direction, handleDateSelection]);

    const minDate =
        direction === 'schedule' ? dayjs().toDate() : dayjs().subtract(30, 'day').toDate();
    const maxDate = direction === 'schedule' ? dayjs().add(30, 'day').toDate() : dayjs().toDate();

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
                        <Tab key={index} label={<DateLabel date={date} />} />
                    ))}
                </Tabs>
                <IconButton onClick={handleOpenModal}>
                    <DateIcon />
                </IconButton>
            </Box>
            <Modal className={style.datePickerModal} onClose={handleCloseModal} open={openModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '16px',
                        p: '16px 0'
                    }}
                >
                    <DatePicker
                        inline
                        locale="zh-CN"
                        maxDate={maxDate}
                        minDate={minDate}
                        onChange={date => {
                            setPickerDate(date);
                        }}
                        selected={pickerDate}
                    />
                    <div className={style.modalButtons}>
                        <Button
                            className={`${style.modalButton} ${style.cancelButton}`}
                            onClick={handleCloseModal}
                            variant="outlined"
                        >
                            取消
                        </Button>
                        <Button
                            className={`${style.modalButton} ${style.confirmButton}`}
                            onClick={handleConfirmDate}
                        >
                            确定
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default BaseDatePicker;
