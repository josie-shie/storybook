'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import 'dayjs/locale/zh-cn';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { useNotificationStore } from '@/app/notificationStore';
import { useHandicapAnalysisFormStore } from '../../handicapAnalysisFormStore';
import style from './datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DateIcon from './img/date.png';

registerLocale('zh-CN', zhCN);

function Datepicker({
    openModal,
    setOpenModal,
    updateQueryDate
}: {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    updateQueryDate: (startDate: number, endDate: number) => void;
}) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const maxDate = dayjs().subtract(1, 'day').toDate();
    const minDate = dayjs().subtract(91, 'day').toDate();
    const setNotificationVisible = useNotificationStore.use.setIsVisible();
    const setTimeRange = useHandicapAnalysisFormStore.use.setTimeRange();

    const closeModal = () => {
        setOpenModal(false);
        setStartDate(null);
        setEndDate(null);
    };

    const handleConfirmDate = () => {
        if (startDate && endDate) {
            const daysDiff = dayjs(endDate).diff(dayjs(startDate), 'day');

            if (daysDiff < 7) {
                setNotificationVisible('选择的日期区间必须至少为7天', 'error');
                return;
            }

            updateQueryDate(
                Math.floor(startDate.getTime() / 1000),
                Math.floor(endDate.getTime() / 1000)
            );
        }
        setTimeRange('setRange');
        setOpenModal(false);
    };

    return (
        <>
            <Box className={`baseDatePicker ${style.baseDatePicker}`}>
                <IconButton
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    <Image alt="" height={20} src={DateIcon} width={20} />
                </IconButton>
            </Box>
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
                        endDate={endDate}
                        inline
                        locale="zh-CN"
                        maxDate={maxDate}
                        minDate={minDate}
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
        </>
    );
}

export default Datepicker;
