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
                        <h1>每日竞猜机会</h1>
                        <ul>
                            <li>每位用户每天拥有五次参与猜球的机会。</li>
                            <li>猜球的次数会在每天的中午12:00重置。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>竞猜玩法</h1>
                        <ul>
                            <li className={style.number}>猜胜负：预测比赛的胜方或是否平局。</li>
                            <li className={style.number}>猜总进球：预测比赛的总进球数量。</li>
                            <li>每场比赛的个别玩法限竞猜一次。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>解锁高胜率玩家风向比例</h1>
                        <ul>
                            <li>完成至少一次竞猜后，将可查看高胜率玩家的竞猜选择比例及人数。</li>
                            <li>可以提供您参考，以便作出更加明智的竞猜决策。</li>
                        </ul>
                    </div>
                    <div className={style.row}>
                        <h1>其他注意事项</h1>
                        <ul>
                            <li>请于比赛开始前完成竞猜。</li>
                            <li>当日未使用的竞猜机会将不会累积至隔日。</li>
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
