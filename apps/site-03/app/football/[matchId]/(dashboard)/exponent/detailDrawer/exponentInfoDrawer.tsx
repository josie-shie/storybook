import Drawer from '@mui/material/Drawer';
import { Tab, Tabs } from 'ui';
import type {
    ExponentDetailHandicapsInfo,
    ExponentDetailWinDrawLoseInfo,
    ExponentDetailOverUnderInfo
} from 'data-center';
import { getExponentDetail } from 'data-center';
import { useState, useEffect } from 'react';
import { useExponentStore } from '@/app/football/[matchId]/exponentStore';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import NoData from '@/components/baseNoData/noData';
import type { TabListType } from '@/types/exponent';
import BackIcon from '../img/back.svg';
import style from './exponentInfoDrawer.module.scss';
import DetailTable from './detailTable';

interface ExponentInfoListType {
    handicap: Record<number, ExponentDetailHandicapsInfo[]>;
    overUnder: Record<number, ExponentDetailOverUnderInfo[]>;
    winDrawLose: Record<number, ExponentDetailWinDrawLoseInfo[]>;
    corners: Record<number, ExponentDetailOverUnderInfo[]>;
}

const infoMock = {
    handicap: {
        8: [
            {
                awayScore: 3,
                homeScore: 1,
                handicap: -0.5,
                homeOdds: 1.9,
                awayOdds: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            },
            {
                awayScore: 2,
                homeScore: 1,
                handicap: -0.5,
                homeOdds: 1.9,
                awayOdds: 1.9,
                closed: true,
                state: 1,
                oddsChangeTime: 1706310000
            },
            {
                awayScore: 3,
                homeScore: 1,
                handicap: -0.5,
                homeOdds: 1.9,
                awayOdds: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            }
        ]
    },
    overUnder: {
        8: [
            {
                awayScore: 3,
                homeScore: 1,
                line: -0.5,
                overOdds: 1.9,
                underOdds: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            },
            {
                awayScore: 2,
                homeScore: 1,
                line: -0.5,
                overOdds: 1.9,
                underOdds: 1.9,
                closed: true,
                state: 1,
                oddsChangeTime: 1706310000
            },
            {
                awayScore: 3,
                homeScore: 1,
                line: -0.5,
                overOdds: 1.9,
                underOdds: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            }
        ]
    },
    winDrawLose: {
        8: [
            {
                awayScore: 3,
                homeScore: 1,
                draw: -0.5,
                homeWin: 1.9,
                awayWin: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            },
            {
                awayScore: 2,
                homeScore: 1,
                draw: -0.5,
                homeWin: 1.9,
                awayWin: 1.9,
                closed: true,
                state: 1,
                oddsChangeTime: 1706310000
            },
            {
                awayScore: 3,
                homeScore: 1,
                draw: -0.5,
                homeWin: 1.9,
                awayWin: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            }
        ]
    },
    corners: {
        8: [
            {
                awayScore: 3,
                homeScore: 1,
                line: -0.5,
                overOdds: 1.9,
                underOdds: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            },
            {
                awayScore: 2,
                homeScore: 1,
                line: -0.5,
                overOdds: 1.9,
                underOdds: 1.9,
                closed: true,
                state: 1,
                oddsChangeTime: 1706310000
            },
            {
                awayScore: 3,
                homeScore: 1,
                line: -0.5,
                overOdds: 1.9,
                underOdds: 1.9,
                closed: false,
                state: 1,
                oddsChangeTime: 1706610600
            }
        ]
    }
};

function ExponentInfoDrawer() {
    const [detailList, setDetailList] = useState<ExponentInfoListType>(infoMock);
    const isOpen = useExponentStore.use.isDetailOpen();
    const setIsOpen = useExponentStore.use.setIsDetailOpen();
    const tabValue = useExponentStore.use.detailSelectedKind();
    const setDetailOption = useExponentStore.use.setDetailOption();
    const detailCompanyId = useExponentStore.use.detailCompanyId();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const companyList = useExponentStore.use.companyList();
    const companyInfo = useExponentStore.use.companyInfo();
    const setIsDetailLoading = useExponentStore.use.setIsDetailLoading();

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const tabList = [
        { label: '让球', value: 'handicap' },
        { label: '总进球', value: 'overUnder' },
        { label: '胜平负', value: 'winDrawLose' },
        { label: '角球', value: 'corners' }
    ];

    useEffect(() => {
        const converted: ExponentInfoListType = {
            handicap: {},
            overUnder: {},
            winDrawLose: {},
            corners: {}
        };

        Object.keys(companyInfo).forEach((category: TabListType) => {
            converted[category] = {};

            Object.keys(companyInfo[category]).forEach(companyId => {
                const numericKey = Number(companyId);
                if (!isNaN(numericKey)) {
                    converted[category][numericKey] = [];
                }
            });
        });

        setDetailList(converted);
    }, [companyList]);

    const handleChange = (tab: TabListType) => {
        if (companyList[tab].length === 0) {
            setDetailOption(detailCompanyId, tab);
            return;
        }

        if (companyList[tab].includes(detailCompanyId)) {
            setDetailOption(detailCompanyId, tab);
        } else {
            setDetailOption(companyList[tab][0], tab);
        }
    };

    const fetchCompanyLiveOddsDetail = async () => {
        setIsDetailLoading(true);
        try {
            const res = await getExponentDetail(matchDetail.matchId, detailCompanyId);

            if (!res.success) {
                throw new Error();
            }

            setDetailList(prevValue => ({
                ...prevValue,
                ...{
                    handicap: {
                        [detailCompanyId]: res.data.handicap
                    },
                    overUnder: {
                        [detailCompanyId]: res.data.overUnder
                    },
                    winDrawLose: {
                        [detailCompanyId]: res.data.winDrawLose
                    },
                    corners: {
                        [detailCompanyId]: res.data.corners
                    }
                }
            }));
        } catch (error) {
            console.error(error);
        }
        setIsDetailLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            void fetchCompanyLiveOddsDetail();
        }
    }, [isOpen, detailCompanyId]);

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
                    <p className={style.title}>
                        {matchDetail.homeChs} VS {matchDetail.awayChs}
                    </p>

                    <BackIcon
                        className={style.back}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    />
                </div>
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
                            {companyList[tab.value as TabListType].length > 0 ? (
                                <DetailTable dataList={detailList} />
                            ) : (
                                <NoData key={tab.value} text="暂无资料" />
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </Drawer>
    );
}

export default ExponentInfoDrawer;
