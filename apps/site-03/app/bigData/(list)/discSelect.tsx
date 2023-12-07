'use client';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import { mqttService } from 'lib';
import Star from './img/star.png';
import style from './disSelect.module.scss';
import RecordFilter from './components/recordFilter/recordFilter';
import HandicapDrawer from './components/handicapDrawer/handicapDrawer';
import { GameFilter } from './components/gameFilter/gameFilter';
import { creatDiscSelectStore, useDiscSelectStore } from './discSelectStore';
import { creatMatchFilterStore, useMatchFilterStore } from './matchFilterStore';
import Datepicker from './components/datepicker/datepicker';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';

type OddsResultType = '赢' | '输' | '大' | '小';
interface HandicapTipType {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeId: number;
    homeChs: string;
    awayId: number;
    awayChs: string;
    teamId: number;
    teamChs: string; // 哪一隊連
    oddsResult: OddsResultType; // 輸、贏、大、小
    longOddsTimes: number; // n場
    isFamous: boolean; // 是否熱門賽事
    leagueLevel: number;
}

const matchList = [
    {
        startTime: 1701400376,
        matchId: 2504100,
        countryCn: '科威特',
        leagueId: 923,
        leagueChsShort: '科威甲',
        homeId: 3669,
        homeChs: '苏拉比卡',
        awayId: 3674,
        awayChs: '阿尔塔达孟',
        teamId: 3674,
        teamChs: '阿尔塔达孟',
        oddsResult: '输', // 輸、贏、大、小
        longOddsTimes: 4, // n場
        isFamous: true, // 是否熱門賽事
        leagueLevel: 0
    },
    {
        startTime: 1701300376,
        matchId: 25041011,
        countryCn: '日本',
        leagueId: 924,
        leagueChsShort: '日本',
        homeId: 3669,
        homeChs: '苏拉比卡',
        awayId: 3674,
        awayChs: '阿尔塔达孟',
        teamId: 3674,
        teamChs: '阿尔塔达孟',
        oddsResult: '赢', // 輸、贏、大、小
        longOddsTimes: 1, // n場
        isFamous: false, // 是否熱門賽事
        leagueLevel: 0
    },
    {
        startTime: 1701300376,
        matchId: 25041012,
        countryCn: '中国',
        leagueId: 925,
        leagueChsShort: '中國',
        homeId: 3669,
        homeChs: '苏拉比卡',
        awayId: 3674,
        awayChs: '阿尔塔达孟',
        teamId: 3674,
        teamChs: '阿尔塔达孟',
        oddsResult: '赢', // 輸、贏、大、小
        longOddsTimes: 1, // n場
        isFamous: false, // 是否熱門賽事
        leagueLevel: 0
    }
] as HandicapTipType[];

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
}

function SectionSelect({
    title,
    selectTitle,
    options,
    placeholder,
    valueSelected,
    setSelected,
    children
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
                    showCloseButton={false}
                    showDragBar
                    title={selectTitle}
                    value={valueSelected}
                />
                {children}
            </div>
        </section>
    );
}

function DiscSelect() {
    creatDiscSelectStore({
        handicapTips: [],
        recordList: []
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    const [showHandicapDrawer, setShowHandicapDrawer] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [handicapOddsSelected, setHandicapOddsSelected] = useState('');
    const setHandicapHints = useDiscSelectStore.use.setHandicapTips();

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

    const [hintsSelected, setHintsSelected] = useState('');
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [teamSelected, setTeamSelected] = useState('');
    const [teamHandicapOdds, setTeamHandicapOdds] = useState('');
    const [showRecord, setShowRecord] = useState(false);
    const [timeRange, setTimeRange] = useState('');
    const [analysisError, setAnalysisError] = useState('');
    const [hintsError, setHintsError] = useState('');

    setHandicapHints(matchList);

    const openHintsDrawer = () => {
        if (!hintsSelected) {
            setHintsError('请选择大小球类别');
            return;
        }

        setHintsError('');
        setContestList({
            contestList: matchList
        });
        setContestInfo({
            contestList: matchList
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
            setStartDate(endDateSelected);
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
                getStartDate = dayjs().subtract(1, 'day').unix();
                getEndDate = dayjs().subtract(7, 'day').unix();
                break;
            case 'month':
                getStartDate = dayjs().subtract(1, 'day').unix();
                getEndDate = dayjs().subtract(30, 'day').unix();

                break;
            case 'season':
                getStartDate = dayjs().subtract(1, 'day').unix();
                getEndDate = dayjs().subtract(120, 'day').unix();
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

        // eslint-disable-next-line -- call mqtt data
        console.dir(params);

        mqttService.publishAnalysis(params);

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
                            options={dateList}
                            placeholder="选择时间"
                            selectTitle="区间"
                            setSelected={setTimeRange}
                            title="时间范围"
                            valueSelected={timeRange}
                        >
                            <Datepicker updateQueryDate={updateQueryDate} />
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
