'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { OddsHintsType, OddsHintsProgress } from 'data-center';
import { getBigdataHint } from 'data-center';
import { useRouter } from 'next/navigation';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';
import Loading from '@/components/loading/loading';
import NoData from '@/components/baseNoData/noData';
import { useMatchFilterStore } from '../analysis/matchFilterStore';
import { useHintsFormStore } from '../analysis/hintsFormStore';
import { useLongDragonStore } from '../longDragonStore';
import ErrorDialog from './components/dialog/dialog';
import MatchFilterDrawer from './components/matchFilterDrawer/matchFilterDrawer';
import LongButton from './components/longButton/longButton';
import iconFilter from './img/filterIcon.png';
import iconSort from './img/sort.png';
import systemErrorImage from './img/systemError.png';
import style from './longDragon.module.scss';
import HandicapTips from './handicapTips';

type LongFilter = '3rd' | '4rd' | '4rdUp' | 'hot';

function SystemError() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const setOpenNormalDialog = useLongDragonStore.use.setOpenNormalDialog();

    useEffect(() => {
        setMessage('哎呀，系统暂时出错！ 请稍候重试');
    }, []);

    return (
        <>
            <div className={style.dialogMessage}>
                <Image alt="" height={100} src={systemErrorImage.src} width={100} />
                <p>{message}</p>
            </div>
            <div className={style.footer}>
                <div
                    className={style.close}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/bigData/analysis?status=tips');
                    }}
                >
                    返回
                </div>
                <div
                    className={style.confirm}
                    onClick={() => {
                        setOpenNormalDialog(false);
                        router.push('/bigData/analysis?status=tips');
                    }}
                >
                    回报错误
                </div>
            </div>
        </>
    );
}

function LongDragonResult() {
    const router = useRouter();
    const hintsSelectPlay = useLongDragonStore.use.hintsSelectPlay();
    const hintsSelectType = useLongDragonStore.use.hintsSelectType();
    const hintsSelectProgres = useLongDragonStore.use.hintsSelectProgres();
    const setDialogContent = useLongDragonStore.use.setDialogContent();
    const dialogContent = useLongDragonStore.use.dialogContent();
    const setOpenNormalDialog = useLongDragonStore.use.setOpenNormalDialog();
    const openNoramlDialog = useLongDragonStore.use.openNoramlDialog();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();

    const handicapTips = useHintsFormStore.use.handicapTips();
    const setHandicapTips = useHintsFormStore.use.setHandicapTips();
    const timeAscending = useHintsFormStore.use.timeAscending();
    const setTimeAscending = useHintsFormStore.use.setTimeAscending();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isActive, setIsActive] = useState<LongFilter[]>([]);

    const backHandler = () => {
        router.push('/bigData/analysis?status=tips');
    };

    const updateActive = (newActive: LongFilter[]) => {
        setIsActive(newActive);
    };

    const getBigdataHintList = async () => {
        const res = await getBigdataHint({
            continuity: hintsSelectType as OddsHintsType,
            progress: hintsSelectProgres as OddsHintsProgress
        });
        if (!res.success) {
            setTimeout(() => {
                setOpenNormalDialog(true);
                setIsLoading(false);
                setDialogContent(<SystemError />);
            }, 500);
            return;
        }

        const sortList = res.data.sort((a, b) => {
            if (a.leagueLevel === 1 || b.leagueLevel === 1) {
                return a.leagueLevel === 1 ? -1 : 1;
            } else if (a.leagueLevel === 2 || b.leagueLevel === 2) {
                return a.leagueLevel === 2 ? -1 : 1;
            }
            return a.startTime - b.startTime;
        });

        setHandicapTips(sortList);

        setContestList({
            contestList: res.data
        });
        setContestInfo({
            contestList: res.data
        });
        setIsLoading(false);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const openFilter = () => {
        setIsFilterOpen(true);
    };

    const changeTimeSorting = () => {
        const newHandicapTips = [...handicapTips];

        newHandicapTips.sort((a, b) =>
            !timeAscending ? a.startTime - b.startTime : b.startTime - a.startTime
        );

        setTimeAscending(!timeAscending);
        setHandicapTips(newHandicapTips);
    };

    const playMappings: Record<string, string> = {
        HANDICAP: '大小球',
        OVERUNDER: '让球'
    };

    const typeMappings: Record<string, string> = {
        OVER: '连续大球',
        UNDER: '连续小球',
        WIN: '连续赢盘',
        LOSE: '连续输盘'
    };

    const progressMappings: Record<string, string> = {
        HALF: '半场',
        FULL: '全场'
    };

    const formatPlay = (name: string) => playMappings[name];
    const formatType = (name: string) => typeMappings[name];
    const formatProgress = (name: string) => progressMappings[name];

    useEffect(() => {
        void getBigdataHintList();
    }, [hintsSelectPlay, hintsSelectType, hintsSelectProgres]);

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        setDialogContent(null);
    }, [setDialogContent]);

    return (
        <>
            <HeaderTitleFilter backHandler={backHandler} background title="今日长龙赛事" />
            <div className={style.layout}>
                <div className={style.longDragon}>
                    <div className={style.column}>
                        <div className={style.row}>
                            <span className={style.title}>玩法</span>
                            <span className={style.name}>{formatPlay(hintsSelectPlay)}</span>
                        </div>
                        <div className={style.row}>
                            <span className={style.title}>连续方式</span>
                            <span className={style.name}>{formatType(hintsSelectType)}</span>
                        </div>
                        <div className={style.row}>
                            <span className={style.title}>半/全场</span>
                            <span className={style.date}>
                                {formatProgress(hintsSelectProgres)}赛事
                            </span>
                        </div>
                    </div>
                </div>
                <div className={style.dashboard}>
                    <div className={style.toolBar}>
                        <button className={style.filter} onClick={openFilter} type="button">
                            赛事筛选
                            <Image alt="" className={style.image} src={iconFilter} />
                        </button>
                        <button className={style.filter} onClick={changeTimeSorting} type="button">
                            开赛时间
                            <Image alt="" className={style.image} src={iconSort} />
                        </button>
                    </div>
                    <LongButton isActive={isActive} updateActive={updateActive} />
                    <div className={style.wrapper}>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <>
                                {handicapTips.length ? (
                                    <HandicapTips
                                        activeFilters={isActive}
                                        hintsSelectPlay={hintsSelectPlay}
                                        hintsSelectProgres={hintsSelectProgres}
                                    />
                                ) : (
                                    <NoData text="暂无资料" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ErrorDialog
                content={<div className={style.dialogContent}>{dialogContent}</div>}
                onClose={() => {
                    setOpenNormalDialog(false);
                }}
                openDialog={openNoramlDialog}
            />
            <MatchFilterDrawer isOpen={isFilterOpen} onClose={closeFilter} onOpen={openFilter} />
        </>
    );
}

export default LongDragonResult;
