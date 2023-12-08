'use client';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import { mqttService } from 'lib';
import type { OddsHintRequest } from 'data-center';
import { getBigdataHint } from 'data-center';
import Star from './img/star.png';
import style from './disSelect.module.scss';
import RecordFilter from './components/recordFilter/recordFilter';
import HandicapDrawer from './components/handicapDrawer/handicapDrawer';
import { GameFilter } from './components/gameFilter/gameFilter';
import { useDiscSelectStore } from './discSelectStore';
import { useMatchFilterStore } from './matchFilterStore';
import Datepicker from './components/datepicker/datepicker';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import { useNotificationStore } from '@/app/notificationStore';

interface OptionType {
    label: string;
    value: string;
}

interface SectionSelectProps {
    title: string;
    selectTitle: string;
    options: OptionType[];
    placeholder: string;
    valueSelected: string;
    setSelected: (val: string) => void;
    children?: ReactNode;
    openDatePicker?: boolean;
    setOpenDatePicker?: (openDatePicker: boolean) => void;
}

function SectionSelect({
    title,
    selectTitle,
    options,
    placeholder,
    valueSelected,
    setSelected,
    children,
    setOpenDatePicker
}: SectionSelectProps) {
    return (
        <section className={style.items}>
            <p className={style.title}>{title}</p>
            <div className={style.select}>
                <div className={style.selectTitle}>{selectTitle}</div>
                <GameFilter
                    onChange={setSelected}
                    options={options}
                    placeholder={placeholder}
                    setOpenDatePicker={setOpenDatePicker}
                    showCloseButton={false}
                    showDragBar
                    title={selectTitle}
                    value={valueSelected}
                >
                    {children}
                </GameFilter>
            </div>
        </section>
    );
}

function DiscSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const [showHandicapDrawer, setShowHandicapDrawer] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [handicapOddsSelected, setHandicapOddsSelected] = useState('');
    const setHandicapTips = useDiscSelectStore.use.setHandicapTips();

    const teamList = useDiscSelectStore.use.teamList();
    const handicapNumberList = useDiscSelectStore.use.handicapNumberList();
    const overUnderNumberList = useDiscSelectStore.use.overUnderNumberList();
    const dateList = useDiscSelectStore.use.dateList();
    const playList = useDiscSelectStore.use.playList();

    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const userInfo = useUserStore.use.userInfo();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();

    const [hintsSelected, setHintsSelected] = useState('');
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [teamSelected, setTeamSelected] = useState('');
    const [teamHandicapOdds, setTeamHandicapOdds] = useState('');
    const [showRecord, setShowRecord] = useState(false);
    const [timeRange, setTimeRange] = useState('');
    const [analysisError, setAnalysisError] = useState('');
    const [hintsError, setHintsError] = useState('');
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const openHintsDrawer = async () => {
        if (!hintsSelected) {
            setHintsError('请选择大小球类别');
            return;
        }

        setHintsError('');

        const res = await getBigdataHint(hintsSelected as unknown as OddsHintRequest);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得盘路提示资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        setHandicapTips(res.data);
        setContestList({
            contestList: res.data
        });
        setContestInfo({
            contestList: res.data
        });
        setShowHandicapDrawer(true);
    };

    const updateQueryDate = (
        startDateSelected?: number,
        endDateSelected?: number,
        type?: string
    ) => {
        if (type) {
            setStartDate(dayjs().subtract(1, 'day').toDate().getTime());

            switch (type) {
                case 'week':
                    setEndDate(dayjs().subtract(8, 'day').toDate().getTime());
                    break;
                case 'month':
                    setEndDate(dayjs().subtract(31, 'day').toDate().getTime());
                    break;
                case 'season':
                    setEndDate(dayjs().subtract(91, 'day').toDate().getTime());
                    break;
            }
        } else if (startDateSelected && endDateSelected) {
            setStartDate(startDateSelected);
            setEndDate(endDateSelected);
        }
    };

    const getTrendAnalysis = () => {
        if (!timeRange) {
            setAnalysisError('请选择时间区间');
            return;
        } else if ((!teamSelected || !teamHandicapOdds) && !handicapOddsSelected) {
            setAnalysisError('让方或盘口需至少选择一种');
            return;
        }

        let getStartDate = 0;
        let getEndDate = 0;

        switch (timeRange) {
            case 'week':
                getStartDate = dayjs().subtract(7, 'day').unix();
                getEndDate = dayjs().subtract(1, 'day').unix();
                break;
            case 'month':
                getStartDate = dayjs().subtract(30, 'day').unix();
                getEndDate = dayjs().subtract(1, 'day').unix();

                break;
            case 'season':
                getStartDate = dayjs().subtract(120, 'day').unix();
                getEndDate = dayjs().subtract(1, 'day').unix();
                break;
        }

        const params = {
            mission: 'create',
            uid: userInfo.uid,
            handicap_side: teamSelected,
            handicap_values: teamHandicapOdds,
            overUnder_values: handicapOddsSelected,
            startTime: getStartDate || startDate,
            endTime: getEndDate || endDate
        };

        void mqttService.publishAnalysis(params);

        setShowRecord(true);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    return (
        <>
            <div className={style.discSelect}>
                {search === 'analysis' ? (
                    <>
                        <div
                            className={style.record}
                            onClick={() => {
                                setShowRecord(true);
                            }}
                        >
                            分析纪录
                        </div>
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
                                    showCloseButton={false}
                                    showDragBar
                                    title="选择让方"
                                    value={teamHandicapOdds}
                                />
                            </div>
                        </section>
                        <SectionSelect
                            options={overUnderNumberList}
                            placeholder="不挑选"
                            selectTitle="盘口"
                            setSelected={setHandicapOddsSelected}
                            title="全场大小"
                            valueSelected={handicapOddsSelected}
                        />
                        <SectionSelect
                            openDatePicker={openDatePicker}
                            options={dateList}
                            placeholder="选择时间"
                            selectTitle="区间"
                            setOpenDatePicker={setOpenDatePicker}
                            setSelected={setTimeRange}
                            title="时间范围"
                            valueSelected={timeRange}
                        >
                            <Datepicker
                                openModal={openDatePicker}
                                setOpenModal={setOpenDatePicker}
                                updateQueryDate={updateQueryDate}
                            />
                        </SectionSelect>
                    </>
                ) : (
                    <SectionSelect
                        options={playList}
                        placeholder="选择全场大小球"
                        selectTitle=""
                        setSelected={setHintsSelected}
                        title="玩法筛选"
                        valueSelected={hintsSelected}
                    />
                )}
                <div className={style.tips}>
                    数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
                </div>
                {search === 'analysis' ? (
                    <>
                        <div className={style.error}>{analysisError}</div>
                        <button
                            className={style.search}
                            onClick={() => {
                                getTrendAnalysis();
                            }}
                            type="button"
                        >
                            <Image alt="" height={14} src={Star} width={14} />
                            获得趋势分析
                        </button>
                    </>
                ) : (
                    <>
                        <div className={style.error}>{hintsError}</div>
                        <button className={style.search} onClick={openHintsDrawer} type="button">
                            <Image alt="" height={14} src={Star} width={14} />
                            获得盘路提示
                        </button>
                    </>
                )}
            </div>

            <RecordFilter
                isOpen={showRecord}
                onClose={() => {
                    setShowRecord(false);
                }}
                onOpen={() => {
                    setShowRecord(true);
                }}
            />
            <HandicapDrawer
                hintsSelected={hintsSelected}
                isOpen={showHandicapDrawer}
                onClose={() => {
                    setShowHandicapDrawer(false);
                }}
                onOpen={() => {
                    setShowHandicapDrawer(true);
                }}
            />
            <NormalDialog
                cancelText="取消"
                confirmText="马上升级"
                content={
                    <div className={style.dialogContent}>
                        <p className={style.text}>今日可用次数已用完，</p>
                        <p className={style.text}>升级为VIP会员即可无限次使用！</p>
                    </div>
                }
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={() => {
                    router.push('/userInfo/subscribe');
                }}
                openDialog={openDialog}
            />
        </>
    );
}

export default DiscSelect;
