'use client';
import { useEffect, type ReactNode } from 'react';
import Chip from '@mui/material/Chip';
import { useMatchFilterStore } from '../matchFilterStore';
import { createAnalysisResultStore, useAnalyticsResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import style from './layout.module.scss';
import CloseIcon from './img/close.svg';
import { useQueryFormStore } from '@/app/aiBigData/queryFormStore';
import Header from '@/components/header/headerTransparent';
import { GetFootballStatsRequest, getFootballStats, getMemberInfo } from 'data-center';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/userStore';

type HandicapSideType = 'home' | 'away';

function QueryInfo({ children }: { children: ReactNode }) {
    const endDate = useQueryFormStore.use.endDate();
    const startDate = useQueryFormStore.use.startDate();
    const teamSelected = useQueryFormStore.use.teamSelected();
    const teamHandicapOdds = useQueryFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useQueryFormStore.use.handicapOddsSelected();
    const checkboxState = useQueryFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;
    const selectedleagueIdList = useMatchFilterStore.use.selectedleagueIdList();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterSelected = useMatchFilterStore.use.setFilterSelected();
    const setLoading = useQueryFormStore.use.setLoading();
    const setOpenNormalDialog = useAnalyticsResultStore.use.setOpenNormalDialog();
    const setAnalysisResultData = useAnalyticsResultStore.use.setAnalysisResultData();
    const setDialogContentType = useAnalyticsResultStore.use.setDialogContentType();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();
    const setUserInfo = useUserStore.use.setUserInfo();

    const handicapTeam = {
        home: '主',
        away: '客'
    };

    const handleDelete = async (leagueName: string, leagueId: number) => {
        if (selectedleagueIdList.length <= 1) return;
        const queryLeagueIds = selectedleagueIdList.filter(id => id !== leagueId);

        await fetchData(queryLeagueIds);
        setFilterSelected(leagueName, 'league');
    };

    const fetchData = async (queryLeagueIds: number[]) => {
        const query: GetFootballStatsRequest = {
            mission: 'create',
            leagues: queryLeagueIds,
            startTime: dayjs(startDate).unix(),
            endTime: dayjs(endDate).unix()
        };
        if (handicap) {
            query.handicapSide = teamSelected.length >= 2 ? 'all' : teamSelected[0];
            query.handicapValues = teamHandicapOdds;
        }
        if (overUnder) {
            query.overUnderValues = handicapOddsSelected;
        }

        setLoading(true);
        const res = await getFootballStats(query);

        if (!res.success) {
            setTimeout(() => {
                setOpenNormalDialog(true);
                setLoading(false);
                setAnalysisResultData(undefined);
            }, 500);
            return;
        }

        if (res.data.errorStatus) {
            let dialogType = 'system';
            switch (res.data.errorStatus) {
                case '0':
                    dialogType = 'system'; // 系統錯誤
                    break;
                case '1':
                    dialogType = 'parameter'; // 參數錯誤
                    break;
                case '2':
                    dialogType = 'empty'; //沒有資料
                    break;
                case '3':
                    dialogType = 'balance'; // 餘額不足
                    break;
                default:
                    break;
            }
            setDialogContentType(dialogType);
            setOpenNormalDialog(true);
            setLoading(false);
            setAnalysisResultData(undefined);
            return;
        }

        setAnalysisResultData(res.data);
        setHandicapEchart(res.data);
        setLoading(false);
        void getUserInfo();
    };

    const getUserInfo = async () => {
        const res = await getMemberInfo();
        if (res.success) {
            setUserInfo(res.data);
        }
    };

    const back = () => {
        setDialogContentType('leaveResult');
        setOpenNormalDialog(true);
    };

    return (
        <>
            <Header title="分析结果" backHandler={back} />
            <div className={style.bigDataGame}>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>联赛</span>
                        <span className={style.name}>
                            {selectedleagueIdList.map(id => {
                                return (
                                    <Chip
                                        className={style.tag}
                                        deleteIcon={<CloseIcon />}
                                        key={id}
                                        label={contestInfo[id].leagueChsShort}
                                        onDelete={() => {
                                            void handleDelete(contestInfo[id].leagueChsShort, id);
                                        }}
                                    />
                                );
                            })}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全场让分</span>
                        <span className={style.name}>
                            让方/
                            {teamSelected.length >= 2 || !handicap
                                ? '不挑选'
                                : handicapTeam[teamSelected[0] as HandicapSideType]}
                            、盘口/
                            {handicap ? teamHandicapOdds || teamHandicapOdds === '0' : '不挑选'}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全场大小</span>
                        <span className={style.name}>
                            {overUnder ? handicapOddsSelected : '不挑選'}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>时间区间</span>
                        <span className={style.date}>
                            {startDate} ~ {endDate}
                        </span>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}

function AnalysisResultLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    createAnalysisResultStore({
        analysisResultData: undefined
    });

    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return (
        <div className={style.resultLayout}>
            <QueryInfo>{children}</QueryInfo>
        </div>
    );
}

export default AnalysisResultLayout;
