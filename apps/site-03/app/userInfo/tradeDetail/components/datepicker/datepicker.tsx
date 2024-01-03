'use client';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import type { DateOption } from '../../tradeDetailStore';
import style from './datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('zh-CN', zhCN);

function Datepicker({
    openModal,
    setOpenModal,
    setIsDateRangeOpen,
    handleChangDate,
    setActiveDate,
    setDateDisplay
}: {
    openModal: boolean;
    handleChangDate: (dateRange: number[], type: DateOption) => Promise<void>;
    setOpenModal: (openModal: boolean) => void;
    setIsDateRangeOpen: (isOpen: boolean) => void;
    setActiveDate: (type: DateOption) => void;
    setDateDisplay: (arg: string) => void;
}) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const maxDate = new Date();

    const closeModal = () => {
        setOpenModal(false);
        setStartDate(null);
        setEndDate(null);
    };

    const formatSelectedOneDay = (date: Date) => {
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(startOfDay).setDate(new Date(startOfDay).getDate() + 1);
        return { startOfDay: startOfDay / 1000, endOfDay: endOfDay / 1000 };
    };

    const handleConfirmDate = () => {
        if (startDate) {
            const { startOfDay, endOfDay } = formatSelectedOneDay(startDate);
            let rangeEnd = endOfDay;

            if (endDate && startDate.getTime() !== endDate.getTime()) {
                const endOfDate = new Date(endDate).setHours(0, 0, 0, 0);
                rangeEnd = new Date(endOfDate).setDate(new Date(endDate).getDate() + 1) / 1000;
                setDateDisplay(
                    `${dayjs(startDate).format('YYYY/MM/DD')} - ${dayjs(endDate).format(
                        'YYYY/MM/DD'
                    )}`
                );
            } else {
                setDateDisplay(dayjs(startDate).format('YYYY/MM/DD'));
            }
            void handleChangDate([startOfDay, rangeEnd], 'RANGE');
        }

        setOpenModal(false);
        setIsDateRangeOpen(false);
        setActiveDate('RANGE');
    };

    return (
        <Modal className={style.datePickerModal} onClose={closeModal} open={openModal}>
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
                    onChange={dates => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    selected={startDate}
                    selectsRange
                    selectsStart
                    startDate={startDate}
                />
                <div className={style.modalButtons}>
                    <Button
                        className={`${style.modalButton} ${style.cancelButton}`}
                        onClick={closeModal}
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
    );
}

export default Datepicker;
