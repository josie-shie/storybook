'use client';
import { ButtonBase, Dialog } from '@mui/material';
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
            <Dialog
                PaperProps={{
                    style: {
                        borderRadius: '15px',
                        width: '90%'
                    }
                }}
                onClose={handleClose}
                open={open}
            >
                <div className={style.ruleContent}>
                    <div className={style.title}>规则</div>
                    <p>
                        排行榜分为【周】【月】【季】【连红】，所有榜单于每日中午12:00更新，根据胜率或连红次数排名（只统计已结算的方案）。
                    </p>
                    <div className={style.row}>
                        <h1>周榜</h1>
                        <ul>
                            <li>本榜单统计至当天起前7日内的竞猜方案。</li>
                            <li>上榜条件：需发布超过15场（含）方案，胜率高于50％（含）以上。</li>
                            <li>排序标准：按照胜率高低进行排行。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>月榜</h1>
                        <ul>
                            <li>本榜单统计至当天起前30日内的竞猜方案。</li>
                            <li>上榜条件：需发布超过30场（含）方案，胜率高于50％（含）以上。</li>
                            <li>排序标准：按照胜率高低进行排行。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>季榜</h1>
                        <ul>
                            <li>本榜单统计至当天起前90日内的竞猜方案。</li>
                            <li>上榜条件：需发布超过90场（含）方案，胜率高于50％（含）以上。</li>
                            <li>排序标准：按照胜率高低进行排行。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>连红榜</h1>
                        <ul>
                            <li>本榜單統計至當天起前7日內的競猜方案。</li>
                            <li>上榜條件：連續競猜正確≥3場。</li>
                        </ul>
                    </div>
                    <button className={style.close} onClick={handleClose} type="button">
                        关闭
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default Rule;
