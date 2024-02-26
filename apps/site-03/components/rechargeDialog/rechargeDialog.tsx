import { Dialog } from '@mui/material';
import style from './rechargeDialog.module.scss';
import { CSSProperties, forwardRef } from 'react';
import type { ReactElement } from 'react';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import RechargeIcon from './img/rechargeIcon.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NormalDialogProps {
    openDialog: boolean;
    setRechargeDialogClose: (open: boolean) => void;
    customStyle?: CSSProperties;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RechargeDialog({ setRechargeDialogClose, openDialog, customStyle }: NormalDialogProps) {
    const router = useRouter();
    const recharge = () => {
        setRechargeDialogClose(false);
        router.push('/userInfo/subscribe');
    };
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
            onClose={() => {
                setRechargeDialogClose(false);
            }}
            open={openDialog}
            disableEscapeKeyDown
        >
            <div className={style.normalDialog} style={customStyle}>
                <div className={style.content}>
                    <div className={style.dialogMessage}>
                        <Image alt="" height={100} src={RechargeIcon} width={100} />
                        <p>余额不足，请充值</p>
                    </div>
                    <div className={style.footer}>
                        <div
                            className={style.close}
                            onClick={() => {
                                setRechargeDialogClose(false);
                            }}
                        >
                            返回
                        </div>
                        <div className={style.confirm} onClick={recharge}>
                            前往充值
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default RechargeDialog;
