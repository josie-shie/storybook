'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { OddsHintsType, OddsHintsProgress } from 'data-center';
import { getBigdataHint } from 'data-center';
import { useRouter } from 'next/navigation';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';
import { useNotificationStore } from '@/app/notificationStore';
import Loading from '@/components/loading/loading';
import { useMatchFilterStore } from '../analysis/matchFilterStore';
import { useHintsFormStore } from '../analysis/hintsFormStore';
import { useLongDragonStore } from '../longDragonStore';
import MatchFilterDrawer from './components/matchFilterDrawer/matchFilterDrawer';
import LongButton from './components/longButton/longButton';
import iconFilter from './img/filterIcon.png';
import iconSort from './img/sort.png';
import style from './longDragon.module.scss';
import HandicapTips from './handicapTips';

type LongFilter = '3rd' | '4rd' | '4rdUp' | 'hot';

function LongDragonResult() {
    const router = useRouter();
    const hintsSelectPlay = useLongDragonStore.use.hintsSelectPlay();
    const hintsSelectType = useLongDragonStore.use.hintsSelectType();
    const hintsSelectProgres = useLongDragonStore.use.hintsSelectProgres();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();

    const handicapTips = useHintsFormStore.use.handicapTips();
    const setHandicapTips = useHintsFormStore.use.setHandicapTips();
    const timeAscending = useHintsFormStore.use.timeAscending();
    const setTimeAscending = useHintsFormStore.use.setTimeAscending();

    const setIsVisible = useNotificationStore.use.setIsVisible();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isActive, setIsActive] = useState<LongFilter[]>([]);

    const backHandler = () => {
        router.push('/bigData/analysis?status=tips');
    };

    const updateActive = (newActive: LongFilter[]) => {
        setIsActive(newActive);
    };

    const getBigdataHintList = async () => {
        if (!hintsSelectType && !hintsSelectType) {
            setIsVisible('请重新获取今日长龙赛事！', 'error');
            setTimeout(() => {
                router.push('/bigData/analysis?status=tips');
            }, 1000);
            return;
        }
        const res = await getBigdataHint({
            continuity: hintsSelectType as OddsHintsType,
            progress: hintsSelectProgres as OddsHintsProgress
        });
        if (!res.success) {
            const errorMessage = res.error ? res.error : '获取失败，请联系客服！';
            setIsVisible(errorMessage, 'error');
            setTimeout(() => {
                router.push('/bigData/analysis?status=tips');
            }, 1000);
            return;
        }
        setHandicapTips(res.data);

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

    return (
        <>
            <HeaderTitleFilter backHandler={backHandler} title="今日长龙赛事" />
            <div className={style.layout}>
                <div className={style.longDragon}>
                    <div className={style.column}>
                        <div className={style.row}>
                            <span className={style.title}>玩法</span>
                            <span className={style.name}>{formatPlay(hintsSelectPlay)}</span>
                        </div>
                        <div className={style.row}>
                            <span className={style.title}>連續方式</span>
                            <span className={style.name}>{formatType(hintsSelectType)}</span>
                        </div>
                    </div>
                    <div className={style.column}>
                        <div className={style.row}>
                            <span className={style.title}>半/全場</span>
                            <span className={style.date}>
                                {formatProgress(hintsSelectProgres)}賽事
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
                            <HandicapTips
                                activeFilters={isActive}
                                hintsSelectPlay={hintsSelectPlay}
                                hintsSelectProgres={hintsSelectProgres}
                            />
                        )}
                    </div>
                </div>
            </div>

            <MatchFilterDrawer isOpen={isFilterOpen} onClose={closeFilter} onOpen={openFilter} />
        </>
    );
}

export default LongDragonResult;
