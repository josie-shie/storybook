import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/app/userStore';
import { useHandicapAnalysisFormStore } from '../formStore';
import { useLongDragonStore } from '../longDragonStore';
import style from './disSelect.module.scss';
import starIcon from './img/star.png';
import selectIcon from './img/select.png';
import switchIcon from './img/switch.png';
import Dialog from './components/dialog/dialog';
import SinglePay from './img/singlePay.png';
import RechargeIcon from './img/rechargeIcon.png';

function RechargeAlert() {
    const router = useRouter();
    const setOpenDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();

    const recharge = () => {
        setOpenDialog(false);
        router.push('/userInfo/subscribe');
    };

    return (
        <>
            <div className={style.dialogMessage}>
                <Image alt="" height={100} src={RechargeIcon} width={100} />
                <p>余额不足，请充值</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenDialog(false);
                    }}
                >
                    返回
                </div>
                <div className={style.confirm} onClick={recharge}>
                    前往充值
                </div>
            </div>
        </>
    );
}

function PaymentAlert() {
    const router = useRouter();
    const setOpenDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();
    const userInfo = useUserStore.use.userInfo();

    const comfirm = () => {
        setOpenDialog(false);
        router.push('/bigData/longDragon');
    };

    return (
        <>
            <div className={style.dialogMessage}>
                <Image alt="" height={100} src={SinglePay} width={100} />
                <p className={style.message}>
                    支付
                    <Image alt="" height={14} src={starIcon.src} width={14} /> 80
                </p>
                <p>购买今日长龙赛事？</p>
            </div>
            <div className={style.detail}>我的余额: {userInfo.balance}金币</div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenDialog(false);
                    }}
                >
                    返回
                </div>
                <div className={style.confirm} onClick={comfirm}>
                    确认支付
                </div>
            </div>
        </>
    );
}

function StepIndicator({ stepNumber, text }: { stepNumber: string; text: string }) {
    return (
        <div className={style.step}>
            <span className={style.stepNumber}>
                <span className={style.number}>{stepNumber}</span>
                <span className={style.text}>{text}</span>
            </span>
        </div>
    );
}

function OptionButton({
    active,
    onClick,
    label,
    imageSrc
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    imageSrc: string;
}) {
    return (
        <button
            className={`${style.option} ${active ? style.active : ''}`}
            onClick={onClick}
            type="button"
        >
            {active ? (
                <Image alt="" className={style.select} height={15} src={imageSrc} width={16} />
            ) : null}
            {label}
        </button>
    );
}

function HandicapAnalysisForm() {
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();

    const openDialog = useHandicapAnalysisFormStore.use.openNoramlDialog();
    const setOpenDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();
    const dialogContent = useHandicapAnalysisFormStore.use.dialogContent();
    const setDialogContent = useHandicapAnalysisFormStore.use.setDialogContent();
    const isVip = useUserStore.use.memberSubscribeStatus().planId; // 1是VIP

    const hintsSelectPlay = useLongDragonStore.use.hintsSelectPlay() || 'HANDICAP';
    const hintsSelectType = useLongDragonStore.use.hintsSelectType() || 'OVER';
    const hintsSelectProgres = useLongDragonStore.use.hintsSelectProgres() || 'FULL';

    const setHintsSelectPlay = useLongDragonStore.use.setHintsSelectPlay();
    const setHintsSelectType = useLongDragonStore.use.setHintsSelectType();
    const setHintsSelectProgres = useLongDragonStore.use.setHintsSelectProgres();

    useEffect(() => {
        setHintsSelectPlay('HANDICAP');
        setHintsSelectType('OVER');
        setHintsSelectProgres('FULL');
        setDialogContent(<PaymentAlert />);
    }, []);

    const selectsPlay = (name: string) => {
        setHintsSelectPlay(name);
        if (name === 'HANDICAP') {
            setHintsSelectType('OVER');
        }
        if (name === 'OVERUNDER') {
            setHintsSelectType('WIN');
        }
    };

    const selectsType = (name: string) => {
        setHintsSelectType(name);
    };

    const selectsProgress = (name: string) => {
        setHintsSelectProgres(name);
    };

    const payLong = () => {
        if (!isVip) {
            if (userInfo.balance < 80) {
                setDialogContent(<RechargeAlert />);
                setOpenDialog(true);
            } else {
                setDialogContent(<PaymentAlert />);
                setOpenDialog(true);
            }
        } else {
            router.push('/bigData/longDragon');
        }
    };

    return (
        <>
            <div className={style.step}>
                <StepIndicator stepNumber="1" text="选择玩法" />
                <div className={style.options}>
                    <OptionButton
                        active={hintsSelectPlay === 'HANDICAP'}
                        imageSrc={selectIcon.src}
                        label="大小球"
                        onClick={() => {
                            selectsPlay('HANDICAP');
                        }}
                    />
                    <OptionButton
                        active={hintsSelectPlay === 'OVERUNDER'}
                        imageSrc={selectIcon.src}
                        label="让球"
                        onClick={() => {
                            selectsPlay('OVERUNDER');
                        }}
                    />
                </div>
            </div>
            <div className={style.step}>
                <StepIndicator stepNumber="2" text="连续方式" />
                <div className={style.options}>
                    {hintsSelectPlay === 'HANDICAP' ? (
                        <>
                            <OptionButton
                                active={hintsSelectType === 'OVER'}
                                imageSrc={selectIcon.src}
                                label="连续大球"
                                onClick={() => {
                                    selectsType('OVER');
                                }}
                            />
                            <OptionButton
                                active={hintsSelectType === 'UNDER'}
                                imageSrc={selectIcon.src}
                                label="连续小球"
                                onClick={() => {
                                    selectsType('UNDER');
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <OptionButton
                                active={hintsSelectType === 'WIN'}
                                imageSrc={selectIcon.src}
                                label="连续赢盘"
                                onClick={() => {
                                    selectsType('WIN');
                                }}
                            />
                            <OptionButton
                                active={hintsSelectType === 'LOSE'}
                                imageSrc={selectIcon.src}
                                label="连续输盘"
                                onClick={() => {
                                    selectsType('LOSE');
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={style.step}>
                <StepIndicator stepNumber="3" text="半/全场" />
                <div className={style.special}>
                    <div className={style.specialOptions}>
                        <button
                            className={`${style.option} ${
                                hintsSelectProgres === 'HALF' ? style.first : ''
                            }`}
                            onClick={() => {
                                selectsProgress('HALF');
                            }}
                            type="button"
                        >
                            半场
                        </button>
                        <Image
                            alt=""
                            className={style.switch}
                            height={13}
                            src={switchIcon.src}
                            width={16}
                        />
                        <button
                            className={`${style.option} ${
                                hintsSelectProgres === 'FULL' ? style.second : ''
                            }`}
                            onClick={() => {
                                selectsProgress('FULL');
                            }}
                            type="button"
                        >
                            全场
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.tip}>
                数据中心会将符合您条件设定的24小时内即将开场赛事汇整列出
            </div>
            {/* <div className={style.error}>{hintsError}</div> */}
            <motion.button
                className={style.search}
                onClick={payLong}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                <Image alt="" height={14} src={starIcon.src} width={14} />
                80 获得今日长龙赛事
            </motion.button>
            <Dialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                customStyle={{
                    width: '300px'
                }}
                onClose={() => {
                    setOpenDialog(false);
                }}
                openDialog={openDialog}
            />
        </>
    );
}

export default HandicapAnalysisForm;
