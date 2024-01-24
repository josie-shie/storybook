'use client';
import { useEffect, type ReactNode } from 'react';
import Chip from '@mui/material/Chip';
import { useMatchFilterStore } from '../matchFilterStore';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import style from './layout.module.scss';
import CloseIcon from './img/close.svg';
import { useQueryFormStore } from '@/app/aiBigData/queryFormStore';
import Header from '@/components/header/headerTransparent';

type HandicapSideType = 'home' | 'away';

function CreateStore({ children }: { children: ReactNode }) {
    createAnalysisResultStore({
        analysisResultData: undefined
    });

    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return <>{children}</>;
}

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

    const handicapTeam = {
        home: '主',
        away: '客'
    };

    const handleDelete = (leagueName: string) => {
        setFilterSelected(leagueName, 'league');
    };

    return (
        <CreateStore>
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
                                            handleDelete(contestInfo[id].leagueChsShort);
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
        </CreateStore>
    );
}

function AnalysisResultLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div className={style.resultLayout}>
            <Header title="分析结果" />
            <QueryInfo>{children}</QueryInfo>
        </div>
    );
}

export default AnalysisResultLayout;
