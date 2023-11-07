import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { Tab, Tabs } from 'ui';
import type { HandicapsInfo, TotalGoalsInfo } from 'data-center';
import leftBlackIcon from '../../img/left_black.png';
import { useContestDetailStore } from '../../../../contestDetailStore';
import { useSituationStore } from '../../situationStore';
import style from './oddsDetailDrawer.module.scss';
import HandicapTable from './handicapTable';
import TotalGoalTable from './totalGoalTable';
import WinLoseTable from './winLoseTable';

interface WinDrawLoseType {
    matchId: number;
    companyId: number;
    initialHomeOdds: number;
    initialDrawOdds: number;
    initialAwayOdds: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: number;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
    isClosed: number;
}

type TabTpye =
    | 'fullHandicap'
    | 'halfHandicap'
    | 'fullTotalGoal'
    | 'halfTotalGoal'
    | 'fullWinDrawLose'
    | 'halfWinDrawLose';

function HandicapDrawer() {
    const isOpen = useSituationStore.use.isOddsDetailDrawerOpen();
    const setIsOpen = useSituationStore.use.setIsOddsDetailDrawerOpen();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const tabValue = useSituationStore.use.oddsDeatilDrawerTabValue();
    const setTabValue = useSituationStore.use.setOddsDeatilDrawerTabValue();
    const companyLiveOddsDetail = useSituationStore.use.companyLiveOddsDetail();
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

    const handleChange = (newValue: TabTpye) => {
        setTabValue(newValue);
    };

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
                <div className={style.teamScore}>
                    <p className={style.homeTeam}>{matchDetail.homeChs}</p>
                    <p className={style.score}>
                        {matchDetail.homeScore}-{matchDetail.awayScore}
                    </p>
                    <p className={style.awayTeam}>{matchDetail.awayChs}</p>
                </div>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
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
