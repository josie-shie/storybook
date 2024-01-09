import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import React from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useUserStore } from '@/app/userStore';
import { useNotificationStore } from '@/app/notificationStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import { useHandicapAnalysisFormStore } from '../formStore';
import style from './disSelect.module.scss';
import bulbIcon from './img/bulb.png';
import ruleImage from './img/ruleDemo.png';
import StepIndicator from './components/stepIndicator/stepIndicator';
import OptionButton from './components/optionButton/optionButton';
import selectIcon from './img/select.png';
import starIcon from './img/star.png';
import Datepicker from './components/datepicker/datepicker';
import Dialog from './components/dialog/dialog';
import checkedIcon from './img/check.png';
import RechargeIcon from './img/rechargeIcon.png';

type PlayTypeCheckBox = 'handicap' | 'overUnder';

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

function StepperProcess() {
    const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    const setTeamSelected = useHandicapAnalysisFormStore.use.setTeamSelected();
    const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    const setTeamHandicapOdds = useHandicapAnalysisFormStore.use.setTeamHandicapOdds();
    const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();
    const setHandicapOddsSelected = useHandicapAnalysisFormStore.use.setHandicapOddsSelected();
    const handicapNumberList = useHandicapAnalysisFormStore.use.handicapNumberList();
    const overUnderNumberList = useHandicapAnalysisFormStore.use.overUnderNumberList();
    const openDatePicker = useHandicapAnalysisFormStore.use.openDatePicker();
    const setOpenDatePicker = useHandicapAnalysisFormStore.use.setOpenDatePicker();
    const setStartDate = useHandicapAnalysisFormStore.use.setStartDate();
    const startDate = useHandicapAnalysisFormStore.use.startDate();
    const setEndDate = useHandicapAnalysisFormStore.use.setEndDate();
    const endDate = useHandicapAnalysisFormStore.use.endDate();
    const checkboxState = useHandicapAnalysisFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;

    const updateQueryDate = (startDateSelected?: number, endDateSelected?: number) => {
        if (startDateSelected && endDateSelected) {
            setStartDate(startDateSelected);
            setEndDate(endDateSelected);
        }
    };

    const steps: ReactNode[] = [];
    if (handicap) {
        steps.push(
            <div className={style.step} key="handicapStep1">
                <StepIndicator stepNumber="1" subText="(复选)" text="选择让方" />
                <div className={style.options}>
                    <OptionButton
                        active={teamSelected.includes('home')}
                        imageSrc={selectIcon.src}
                        label="主队"
                        onClick={() => {
                            setTeamSelected('home');
                        }}
                    />
                    <OptionButton
                        active={teamSelected.includes('away')}
                        imageSrc={selectIcon.src}
                        label="客队"
                        onClick={() => {
                            setTeamSelected('away');
                        }}
                    />
                </div>
            </div>
        );

        steps.push(
            <div className={style.step} key="handicapStep2">
                <StepIndicator stepNumber="2" subText="(单选)" text="选择让分数" />
                <div className={style.multipleOption}>
                    {handicapNumberList.map(handicapOption => {
                        return (
                            <OptionButton
                                active={teamHandicapOdds === handicapOption.value}
                                imageSrc={selectIcon.src}
                                key={handicapOption.value}
                                label={handicapOption.label}
                                onClick={() => {
                                    setTeamHandicapOdds(handicapOption.value);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        );

        if (overUnder) {
            steps.push(
                <div className={style.step} key="handicapOverUnder">
                    <StepIndicator stepNumber="3" subText="(单选)" text="选择大小球" />
                    <div className={style.multipleOption}>
                        {overUnderNumberList.map(overUnderOption => {
                            return (
                                <OptionButton
                                    active={handicapOddsSelected === overUnderOption.value}
                                    imageSrc={selectIcon.src}
                                    key={overUnderOption.value}
                                    label={overUnderOption.label}
                                    onClick={() => {
                                        setHandicapOddsSelected(overUnderOption.value);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }
    } else if (overUnder) {
        steps.push(
            <div className={style.step} key="overUnderOnly">
                <StepIndicator stepNumber="1" subText="(单选)" text="选择大小球" />
                <div className={style.multipleOption}>
                    {overUnderNumberList.map(overUnderOption => {
                        return (
                            <OptionButton
                                active={handicapOddsSelected === overUnderOption.value}
                                imageSrc={selectIcon.src}
                                key={overUnderOption.value}
                                label={overUnderOption.label}
                                onClick={() => {
                                    setHandicapOddsSelected(overUnderOption.value);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    let datepickerStep: string;
    if (handicap) {
        datepickerStep = overUnder ? '4' : '3';
    } else {
        datepickerStep = '2';
    }

    steps.push(
        <div className={style.step} key="finalStep">
            <StepIndicator stepNumber={datepickerStep} text="选择时间" />
            <div className={style.timeRange}>
                <div
                    className={style.range}
                    onClick={() => {
                        setOpenDatePicker(true);
                    }}
                >
                    <span>{dayjs(startDate * 1000).format('YYYY/MM/DD')}</span>
                    <span> - </span>
                    <span>{dayjs(endDate * 1000).format('YYYY/MM/DD')}</span>
                </div>
                <div className={style.datepicker}>
                    自订
                    <Datepicker
                        currentEndDate={new Date(endDate * 1000)}
                        currentStartDate={new Date(startDate * 1000)}
                        openModal={openDatePicker}
                        setOpenModal={setOpenDatePicker}
                        updateQueryDate={updateQueryDate}
                    />
                </div>
            </div>
        </div>
    );

    return <>{steps}</>;
}

function PlayTypeCheckbox() {
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const checkboxState = useHandicapAnalysisFormStore.use.checkboxState();
    const setCheckboxState = useHandicapAnalysisFormStore.use.setCheckboxState();

    const { handicap, overUnder } = checkboxState;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, oppositeOption: string) => {
        if (!checkboxState[oppositeOption] && !event.target.checked) {
            setIsVisible('让球与大小球至少选择一项', 'success');
        }
        setCheckboxState(event.target.name as PlayTypeCheckBox, event.target.checked);
    };

    return (
        <>
            <div className={style.playType}>
                <div
                    className={`${style.checkbox} ${
                        handicap ? style.checkedBackground : style.uncheckedBackground
                    }`}
                >
                    <label className={style.checkboxLabel}>
                        {handicap ? (
                            <Image
                                alt=""
                                className={style.select}
                                height={24}
                                src={checkedIcon.src}
                                width={24}
                            />
                        ) : (
                            <div className={style.disabled} />
                        )}

                        <span
                            className={`${style.label} ${
                                handicap ? style.checkedLabel : style.uncheckedLabel
                            }`}
                        >
                            让分
                        </span>
                        <input
                            checked={handicap}
                            name="handicap"
                            onChange={e => {
                                handleChange(e, 'overUnder');
                            }}
                            type="checkbox"
                        />
                    </label>
                </div>
                <div
                    className={`${style.checkbox} ${
                        overUnder ? style.checkedBackground : style.uncheckedBackground
                    }`}
                >
                    <label className={style.checkboxLabel}>
                        {overUnder ? (
                            <Image
                                alt=""
                                className={style.select}
                                height={24}
                                src={checkedIcon.src}
                                width={24}
                            />
                        ) : (
                            <div className={style.disabled} />
                        )}

                        <span
                            className={`${style.label} ${
                                overUnder ? style.checkedLabel : style.uncheckedLabel
                            }`}
                        >
                            大小
                        </span>
                        <input
                            checked={overUnder}
                            name="overUnder"
                            onChange={e => {
                                handleChange(e, 'handicap');
                            }}
                            type="checkbox"
                        />
                    </label>
                </div>
            </div>
            <StepperProcess />
        </>
    );
}

function Tips() {
    const openTips = useHandicapAnalysisFormStore.use.openTips();
    const setOpenTips = useHandicapAnalysisFormStore.use.setOpenTips();
    const isTipsOpened = useHandicapAnalysisFormStore.use.isTipsOpened();
    const setIsTipsOpened = useHandicapAnalysisFormStore.use.setIsTipsOpened();

    const showTips = () => {
        setOpenTips(true);

        if (!isTipsOpened) {
            setIsTipsOpened(true);
        }
    };

    const hideTips = () => {
        setOpenTips(false);

        if (!isTipsOpened) {
            setIsTipsOpened(true);
        }

        const element = document.getElementById('bigDataAnalysis');
        if (element) {
            element.scrollTop = 0;
        }
    };

    return (
        <div className={style.tips} style={{ backgroundColor: openTips ? '#F6F6F6' : '#FFF' }}>
            {isTipsOpened && !openTips ? (
                <div className={style.tipsShort}>
                    <Image alt="bulb" height={16} src={bulbIcon.src} width={16} />
                    <span className={style.title}>何谓盘路分析？</span>
                    <span className={style.showTips} onClick={showTips}>
                        了解更多
                    </span>
                </div>
            ) : null}
            {!isTipsOpened || openTips ? (
                <>
                    <div className={style.title}>
                        <Image alt="bulb" height={16} src={bulbIcon.src} width={16} />
                        您可获得：
                    </div>
                    <div className={style.content}>
                        <p className={style.description}>
                            选择让分盘或大小盘，可获取指定时间内智能盘口命中分析：让分大小、进球数区间、15分钟进球、全场波胆
                        </p>
                        {openTips ? (
                            <Image alt="" height={415} src={ruleImage.src} width={342} />
                        ) : null}
                    </div>
                </>
            ) : null}
            {!isTipsOpened || openTips ? (
                <div
                    className={style.bottom}
                    style={{ justifyContent: openTips ? 'center' : 'space-between' }}
                >
                    <div className={style.hideTips} onClick={hideTips}>
                        隐藏提示
                    </div>
                    {!openTips ? (
                        <div className={style.showTips} onClick={showTips}>
                            了解更多
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

function HandicapAnalysisForm() {
    const router = useRouter();
    const setIsOpenPayDrawer = useHandicapAnalysisFormStore.use.setIsOpenPayDrawer();
    const setOpenDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();
    const openDialog = useHandicapAnalysisFormStore.use.openNoramlDialog();
    const isVip = useUserStore.use.memberSubscribeStatus().planId; // 1是VIP
    const userInfo = useUserStore.use.userInfo();
    const setOpenNormalDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();
    const setIsAnalysisBySearch = useHandicapAnalysisFormStore.use.setIsAnalysisBySearch();
    const isOpenPayDrawer = useHandicapAnalysisFormStore.use.isOpenPayDrawer();

    const confirm = () => {
        setIsOpenPayDrawer(false);
        setIsAnalysisBySearch(true);
        router.push('/bigData/result');
    };

    const submit = () => {
        if (!isVip) {
            if (userInfo.balance < 80) {
                setOpenNormalDialog(true);
                return;
            }
            setIsOpenPayDrawer(true);
            return;
        }

        setIsAnalysisBySearch(true);
        router.push('/bigData/result');
    };

    return (
        <>
            <Tips />
            <div className={style.selectContent}>
                <PlayTypeCheckbox />
            </div>
            <motion.button
                className={style.search}
                onClick={submit}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                {!isVip ? (
                    <>
                        <Image alt="" height={14} src={starIcon.src} width={14} />
                        <span>80</span>
                    </>
                ) : null}
                <span>获得趋势分析</span>
            </motion.button>
            <Dialog
                content={
                    <div className={style.dialogContent}>
                        <RechargeAlert />
                    </div>
                }
                customStyle={{
                    width: '300px'
                }}
                onClose={() => {
                    setOpenDialog(false);
                }}
                openDialog={openDialog}
            />
            <ConfirmPayDrawer
                isOpen={isOpenPayDrawer}
                onClose={() => {
                    setIsOpenPayDrawer(false);
                }}
                onOpen={() => {
                    setIsOpenPayDrawer(true);
                }}
                onPay={confirm}
                price={80}
                title="獲得智能盤路分析？"
            />
        </>
    );
}

export default HandicapAnalysisForm;
