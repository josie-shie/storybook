'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import 'dayjs/locale/zh-cn';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNotificationStore } from '@/app/notificationStore';
import { useAccountStore, type FormState } from '../../accountStore';
import style from './datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('zh-CN', zhCN);

function Datepicker({
    openModal,
    setOpenModal,
    setFormState
}: {
    openModal: boolean;
    setOpenModal: (isOpen: boolean) => void;
    setFormState: (formState: FormState) => void;
}) {
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const maxDate = dayjs().subtract(1, 'day').toDate();
    const formState = useAccountStore.use.formState();
    const [newDate, setNewDate] = useState<Date | null>(new Date());
    const closeModal = () => {
        setOpenModal(false);
        setNewDate(null);
    };

    const handleConfirmDate = () => {
        if (!newDate) {
            setIsVisible('請選擇日期', 'error');
            return;
        }
        setFormState({
            ...formState,
            birthday: newDate.getTime() / 1000
        });
        setOpenModal(false);
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
                    onChange={date => {
                        if (date) setNewDate(date);
                    }}
                    selectsStart
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
