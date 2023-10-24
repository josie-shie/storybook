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
                <DialogTitle>規則</DialogTitle>
                <div className={style.ruleContent}>
                    <p>
                        規則說明規則說明規則說明規則說明規則說明規則說明規則說明規則說明規則說明規則說明規則說明規則說明
                    </p>
                </div>
            </Dialog>
        </>
    );
}

export default Rule;
