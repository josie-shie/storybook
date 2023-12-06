'use client';
import { ButtonBase, Dialog, DialogTitle } from '@mui/material';
import { useState } from 'react';
import style from './rule.module.scss';

function Rule() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ButtonBase>
                <div className={style.rule}>
                    <span onClick={handleClickOpen}>規則</span>
                </div>
            </ButtonBase>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>規則說明</DialogTitle>
                <div className={style.ruleContent}>
                    <p>
                        參與者預測比賽結果，通常包括主客比分、勝負或其他特定事件。
                        <br />
                        比賽結束後，如果預測正確，參與者贏得獎金，否則失去投注金額。
                        <br />
                        公平性、透明度和合法性為本站核心原則。
                        <br />
                        請玩家謹慎參與，不要超出財務承受範圍。
                    </p>
                </div>
            </Dialog>
        </>
    );
}

export default Rule;
