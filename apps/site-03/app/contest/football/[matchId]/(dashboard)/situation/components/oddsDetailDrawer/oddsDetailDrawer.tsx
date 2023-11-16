import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { Tab, Tabs } from 'ui';
import type { HandicapsInfo, TotalGoalsInfo, WinDrawLoseType } from 'data-center';
import { getOddsRunning } from 'data-center';
import { useEffect } from 'react';
import leftBlackIcon from '../../img/left_black.png';
import { useContestDetailStore } from '../../../../contestDetailStore';
import { useSituationStore } from '../../../../situationStore';
import style from './oddsDetailDrawer.module.scss';
import HandicapTable from './handicapTable';
import TotalGoalTable from './totalGoalTable';
import WinLoseTable from './winLoseTable';
import { useContestInfoStore } from '@/app/contestInfoStore';

type TabTpye =
    | 'fullHandicap'
    | 'halfHandicap'
    | 'fullTotalGoal'
    | 'halfTotalGoal'
    | 'fullWinDrawLose'
    | 'halfWinDrawLose';

function ScroeBar() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useContestInfoStore.use.contestInfo();
    const homeLiveScore =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].homeScore || matchDetail.homeScore
            : matchDetail.homeScore;

    const awayLiveScore =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].awayScore || matchDetail.awayScore
            : matchDetail.awayScore;

    return (
        <div className={style.teamScore}>
            <p className={style.homeTeam}>{matchDetail.homeChs}</p>
            <p className={style.score}>
                {homeLiveScore}-{awayLiveScore}
            </p>
            <p className={style.awayTeam}>{matchDetail.awayChs}</p>
        </div>
    );
}

function HandicapDrawer() {
    const isOpen = useSituationStore.use.isOddsDetailDrawerOpen();
    const setIsOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const tabValue = useSituationStore.use.oddsDeatilDrawerTabValue();
    const setTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const companyLiveOddsDetail = useSituationStore.use.companyLiveOddsDetail();
    const setCompanyOddsDetail = useSituationStore.use.setCompanyLiveOddsDetail();
    const companyNameMap = useContestDetailStore.use.companyNameMap();
    const companyId = useSituationStore.use.companyId();

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const tabList = [
        { label: '全让球', value: 'fullHandicap' },
        { label: '半让球', value: 'halfHandicap' },
        { label: '全总进球', value: 'fullTotalGoal' },
        { label: '半总进球', value: 'halfTotalGoal' },
        { label: '全胜平负', value: 'fullWinDrawLose' },
        { label: '半胜平负', value: 'halfWinDrawLose' }
    ];

    const fetchCompanyLiveOddsDetail = async () => {
        try {
            const res = await getOddsRunning(matchDetail.matchId, companyId, 'HANDICAP');
            if (!res.success) {
                throw new Error();
            }

            setCompanyOddsDetail(res.data);
        } catch (error) {
            throw new Error();
        }
    };

    const handleChange = (newValue: TabTpye) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        if (isOpen) {
            void fetchCompanyLiveOddsDetail();
        }
    }, [isOpen]);

    return (
        <Drawer
            anchor="right"
            className={style.oddsDetailDrawer}
            open={isOpen}
            sx={{
                '& .MuiPaper-root': {
                    width: '100%'
                }
            }}
        >
            <div>
                <div className={style.header}>
                    <p className={style.title}>{companyNameMap[companyId]}现场数据</p>
                    <Image
                        alt=""
                        className={style.back}
                        height={24}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        src={leftBlackIcon.src}
                        width={24}
                    />
                </div>
                <ScroeBar />
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    defaultValue={tabList.findIndex(item => item.value === tabValue) || undefined}
                    gap={tabStyle.gap}
                    onTabChange={handleChange}
                    position="center"
                    styling="underline"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(tab => (
                        <Tab key={tab.value} label={tab.label} value={tab.value}>
                            {tabValue.includes('Handicap') && (
                                <HandicapTable
                                    dataList={
                                        companyLiveOddsDetail.companyOdds[
                                            tabValue
                                        ] as HandicapsInfo[]
                                    }
                                />
                            )}
                            {tabValue.includes('TotalGoal') && (
                                <TotalGoalTable
                                    dataList={
                                        companyLiveOddsDetail.companyOdds[
                                            tabValue
                                        ] as TotalGoalsInfo[]
                                    }
                                />
                            )}
                            {tabValue.includes('WinDrawLose') && (
                                <WinLoseTable
                                    dataList={
                                        companyLiveOddsDetail.companyOdds[
                                            tabValue
                                        ] as WinDrawLoseType[]
                                    }
                                />
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </Drawer>
    );
}

export default HandicapDrawer;
