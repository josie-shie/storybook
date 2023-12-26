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
                    <span onClick={handleClickOpen}>规则</span>
                </div>
            </ButtonBase>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>规则说明</DialogTitle>
                <div className={style.ruleContent}>
                    <p>
                        周榜：统计当天起前7日的方案，需发布15场以上（不含15场），按胜率排行。
                        <br />
                        月榜：统计当天起前30日的方案，需发布30场以上（不含30场），按胜率排行。
                        <br />
                        季榜：统计当天起前90日的方案，需发布90场以上（不含90场），按胜率排行。
                        <br />
                        连红榜：统计当天起前7日的方案，当用户竞猜≥5连红时即可上榜，且获得收费查看资格。
                    </p>
                </div>
            </Dialog>
        </>
    );
}

export default Rule;
