'use client';
import React from 'react';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './guessDialog.module.scss';

interface GuessDialogProps {
    id?: number;
    play?: string;
    handicap?: string;
    homeTeamName?: string;
    awayTeamName?: string;
    openPaid?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function GuessDialog({
    play,
    handicap,
    homeTeamName,
    awayTeamName,
    openPaid = false,
    onClose,
    onConfirm
}: GuessDialogProps) {
    const guessesLeft = useContestDetailStore.use.guessProportion().remainingGuessTimes;

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                    boxShadow: 'none'
                }
            }}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            open={openPaid}
        >
            {guessesLeft === 0 ? (
                <div className={style.guessDialog}>
                    <div className={style.useCount}>今日竞猜次数已使用完毕</div>
                    <div className={style.footer}>
                        <div className={style.confirm} onClick={onClose}>
                            关闭
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.guessDialog}>
                    <div className={style.game}>
                        {homeTeamName}
                        <span>vs</span>
                        {awayTeamName}
                    </div>
                    <div className={style.playWay}>
                        <span>{play}</span>
                        <span>{handicap}</span>
                    </div>
                    <div className={style.countsLeft}>
                        今日剩余 <span>{guessesLeft}</span> 次竞猜
                    </div>
                    <div className={style.footer}>
                        <div className={style.close} onClick={onClose}>
                            取消
                        </div>
                        <div className={style.confirm} onClick={onConfirm}>
                            确定猜球
                        </div>
                    </div>
                </div>
            )}
        </Dialog>
    );
}

export default GuessDialog;
