'use client';
import { Dialog } from '@mui/material';
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
            <div className={style.rule}>
                <span onClick={handleClickOpen}>规则</span>
            </div>
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
                    <div className={style.row}>
                        <h1>让球</h1>
                        <ul>
                            <li>
                                在指定球赛中，预测经过让球调整后的两队比赛结果，选择主队胜出或客队胜出的投注方式。
                            </li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>大小</h1>
                        <ul>
                            <li>
                                在指定球赛中，预测两队的总进球数是大于或小于预设的球盘。若总进球数超过设定的“大球盘”，则下注大球盘胜出；若总进球数少于设定的“小球盘”，则下注小球盘胜出。
                            </li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>15分钟进球</h1>
                        <ul>
                            <li>在指定球赛中，预测特定15分钟时间段内是否会有进球。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>进球数区间</h1>
                        <ul>
                            <li>在指定球赛中，预测比赛的最终总进球数落入哪个特定的区间内。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>全场波胆</h1>
                        <ul>
                            <li>
                                在指定球赛中，预测最终的正确比分，选择最终主队胜出比分、客队胜出比分或和局比分的投注方式。
                            </li>
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
