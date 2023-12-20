import { motion } from 'framer-motion';
import Image from 'next/image';
import dayjs from 'dayjs';
import { mqttService } from 'lib';
import { useEffect } from 'react';
import { useUserStore } from '@/app/userStore';
import style from './disSelect.module.scss';
import { GameFilter } from './components/gameFilter/gameFilter';
import SelectOption from './components/selectOption/selectOption';
import RecordFilter from './components/recordFilter/recordFilter';
import starIcon from './img/star.png';
import disabledStarIcon from './img/disabledStar.png';
import Datepicker from './components/datepicker/datepicker';
import { useHandicapAnalysisFormStore } from './handicapAnalysisFormStore';
import searchIcon from './img/search.png';
import Dialog from './components/dialog/dialog';
import { useDiscSelectStore } from './discSelectStore';

function PaymentAlert({
    getTrendAnalysis
}: {
    getTrendAnalysis: (startDate: number, endDate: number) => Promise<void>;
}) {
    const setOpenDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();
    const userInfo = useUserStore.use.userInfo();
    const startDate = useHandicapAnalysisFormStore.use.startDate();
    const endDate = useHandicapAnalysisFormStore.use.endDate();

    const comfirm = async () => {
        setOpenDialog(false);
        await getTrendAnalysis(startDate, endDate);
    };

    return (
        <>
            <div className={style.dialogMessage}>
                <p className={style.message}>
                    支付
                    <Image alt="" height={14} src={starIcon.src} width={14} /> 80
                </p>
                <p>進行單次分析？</p>
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
                <div
                    className={style.confirm}
                    onClick={() => {
                        void comfirm();
                    }}
                >
                    确认支付
                </div>
            </div>
        </>
    );
}

function TimeRange({ timeRange }: { timeRange: string }) {
    const openDatePicker = useHandicapAnalysisFormStore.use.openDatePicker();
    const setOpenDatePicker = useHandicapAnalysisFormStore.use.setOpenDatePicker();
    const setTimeRange = useHandicapAnalysisFormStore.use.setTimeRange();
    const dateList = useHandicapAnalysisFormStore.use.dateList();
    const setStartDate = useHandicapAnalysisFormStore.use.setStartDate();
    const setEndDate = useHandicapAnalysisFormStore.use.setEndDate();

    const updateQueryDate = (
        startDateSelected?: number,
        endDateSelected?: number,
        type?: string
    ) => {
        if (type) {
            setTimeRange(type);
            setEndDate(Math.floor(dayjs().subtract(1, 'day').toDate().getTime() / 1000));

            switch (type) {
                case 'week':
                    setStartDate(Math.floor(dayjs().subtract(8, 'day').toDate().getTime() / 1000));
                    break;
                case 'month':
                    setStartDate(Math.floor(dayjs().subtract(31, 'day').toDate().getTime() / 1000));
                    break;
                case 'season':
                    setStartDate(Math.floor(dayjs().subtract(91, 'day').toDate().getTime() / 1000));
                    break;
            }
        } else if (startDateSelected && endDateSelected) {
            setStartDate(startDateSelected);
            setEndDate(endDateSelected);
        }
    };

    return (
        <SelectOption
            openDatePicker={openDatePicker}
            options={dateList}
            placeholder="选择时间"
            selectTitle="区间"
            setOpenDatePicker={setOpenDatePicker}
            setSelected={val => {
                updateQueryDate(undefined, undefined, val);
            }}
            title="时间范围"
            valueSelected={timeRange}
        >
            <Datepicker
                openModal={openDatePicker}
                setOpenModal={setOpenDatePicker}
                updateQueryDate={updateQueryDate}
            />
        </SelectOption>
    );
}

function OverUnderSelect({ handicapOddsSelected }: { handicapOddsSelected: string }) {
    const overUnderNumberList = useHandicapAnalysisFormStore.use.overUnderNumberList();
    const setHandicapOddsSelected = useHandicapAnalysisFormStore.use.setHandicapOddsSelected();

    return (
        <SelectOption
            options={overUnderNumberList}
            placeholder="不挑选"
            selectTitle="盘口"
            setSelected={setHandicapOddsSelected}
            title="全场大小"
            valueSelected={handicapOddsSelected}
        />
    );
}

function HandicapSelect({
    teamSelected,
    teamHandicapOdds
}: {
    teamSelected: string;
    teamHandicapOdds: string;
}) {
    const teamList = useHandicapAnalysisFormStore.use.teamList();
    const setTeamSelected = useHandicapAnalysisFormStore.use.setTeamSelected();
    const setTeamHandicapOdds = useHandicapAnalysisFormStore.use.setTeamHandicapOdds();
    const handicapNumberList = useHandicapAnalysisFormStore.use.handicapNumberList();

    return (
        <section className={style.items}>
            <p className={style.title}>全场让球</p>
            <div className={style.select}>
                <div className={style.selectTitle}>让方</div>
                <GameFilter
                    onChange={(val: string) => {
                        setTeamSelected(val);
                    }}
                    options={teamList}
                    placeholder="选择主队"
                    preValueText="选择"
                    showCloseButton={false}
                    showDragBar
                    title="选择让方"
                    value={teamSelected}
                />
                <GameFilter
                    onChange={(val: string) => {
                        setTeamHandicapOdds(val);
                    }}
                    options={handicapNumberList}
                    placeholder="选择让球"
                    preValueText="让球数"
                    showCloseButton={false}
                    showDragBar
                    title="选择让方"
                    value={teamHandicapOdds}
                />
            </div>
        </section>
    );
}

function HandicapAnalysisForm() {
    const showRecord = useHandicapAnalysisFormStore.use.showRecord();
    const setShowRecord = useHandicapAnalysisFormStore.use.setShowRecord();
    const timeRange = useHandicapAnalysisFormStore.use.timeRange();
    const analysisError = useHandicapAnalysisFormStore.use.analysisError();
    const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();
    const setOpenDialog = useHandicapAnalysisFormStore.use.setOpenNormalDialog();
    const dialogErrorType = useHandicapAnalysisFormStore.use.dialogContentType();
    const dialogContent = useHandicapAnalysisFormStore.use.dialogContent();
    const setDialogContent = useHandicapAnalysisFormStore.use.setDialogContent();
    const openDialog = useHandicapAnalysisFormStore.use.openNoramlDialog();
    const isVip = useUserStore.use.memberSubscribeStatus().planId; // 1是VIP
    const setAnalysisError = useHandicapAnalysisFormStore.use.setAnalysisError();
    const userInfo = useUserStore.use.userInfo();
    const startDate = useHandicapAnalysisFormStore.use.startDate();
    const endDate = useHandicapAnalysisFormStore.use.endDate();
    const setDialogContentType = useDiscSelectStore.use.setDialogContentType();
    const setOpenNormalDialog = useDiscSelectStore.use.setOpenNormalDialog();

    const getTrendAnalysis = async (currentStartDate: number, currentEndDate: number) => {
        if (!currentStartDate || !currentEndDate) {
            setAnalysisError('请选择时间区间');
            return;
        }

        if (userInfo.balance < 80) {
            setDialogContentType('balance');
            setOpenNormalDialog(true);
            return;
        }

        const params = {
            mission: 'create',
            memberId: userInfo.uid,
            message: '',
            ticketId: '',
            handicapSide: teamSelected,
            handicapValues: teamHandicapOdds,
            overUnderValues: handicapOddsSelected,
            startTime: currentStartDate,
            endTime: currentEndDate
        };

        await mqttService.publishAnalysis(params);
        setShowRecord(true);
    };

    useEffect(() => {
        switch (dialogErrorType) {
            case 'payment':
                setDialogContent(<PaymentAlert getTrendAnalysis={getTrendAnalysis} />);
                break;
            default:
                setDialogContent(null);
                break;
        }
    }, [dialogErrorType, setDialogContent]);

    const submit = async () => {
        if (!isVip) {
            setOpenDialog(true);
        } else {
            await getTrendAnalysis(startDate, endDate);
        }
    };

    return (
        <>
            <div
                className={style.record}
                onClick={() => {
                    setShowRecord(true);
                }}
            >
                <Image alt="" height={20} src={searchIcon.src} width={20} />
                分析纪录
            </div>
            <HandicapSelect teamHandicapOdds={teamHandicapOdds} teamSelected={teamSelected} />
            <OverUnderSelect handicapOddsSelected={handicapOddsSelected} />
            <TimeRange timeRange={timeRange} />
            <div className={style.tips}>
                数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
            </div>
            <div className={style.error}>{analysisError}</div>
            <motion.button
                className={`${style.search} ${!startDate || !endDate ? style.disableButton : ''}`}
                disabled={!startDate || !endDate}
                onClick={async () => {
                    await submit();
                }}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                <Image
                    alt=""
                    height={14}
                    src={!startDate || !endDate ? disabledStarIcon.src : starIcon.src}
                    width={14}
                />
                获得趋势分析
            </motion.button>
            <RecordFilter
                isOpen={showRecord}
                onClose={() => {
                    setShowRecord(false);
                }}
                onOpen={() => {
                    setShowRecord(true);
                }}
            />
            <Dialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                openDialog={openDialog}
            />
        </>
    );
}

export default HandicapAnalysisForm;
