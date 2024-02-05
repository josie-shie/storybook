import Drawer from '@mui/material/Drawer';
import { Tab, Tabs } from 'ui';
import type { GetExponentDetailResponse } from 'data-center';
import { getExponentDetail } from 'data-center';
import { useState, useEffect } from 'react';
import { useExponentStore } from '@/app/football/[matchId]/exponentStore';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import BackIcon from '../img/back.svg';
import style from './exponentInfoDrawer.module.scss';
import DetailTable from './detailTable';

type TabListType = 'handicap' | 'overUnder' | 'winDrawLose' | 'corners';

const infoMock = {
    handicap: [
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
    ],
    overUnder: [
        {
            homeScore: 1,
            awayScore: 3,
            line: 9.5,
            overOdds: 1.9,
            underOdds: 1.9,
            closed: false,
            state: 1,
            oddsChangeTime: 1706610600
        }
    ],
    winDrawLose: [
        {
            homeScore: 1,
            awayScore: 3,
            homeWin: 2.3,
            draw: 3,
            awayWin: 3,
            closed: false,
            state: 1,
            oddsChangeTime: 1706610600
        }
    ],
    corners: [
        {
            homeScore: 1,
            awayScore: 3,
            line: 9.5,
            overOdds: 1.9,
            underOdds: 1.9,
            closed: false,
            state: 1,
            oddsChangeTime: 1706610600
        }
    ]
};

const listMock = {
    3: infoMock,
    5: infoMock,
    7: infoMock,
    8: infoMock,
    10: infoMock
};

function ExponentInfoDrawer() {
    const [detailList, setDetailList] =
        useState<Record<number, GetExponentDetailResponse>>(listMock);
    const isOpen = useExponentStore.use.isDetailOpen();
    const setIsOpen = useExponentStore.use.setIsDetailOpen();
    const tabValue = useExponentStore.use.detailSelectedKind();
    const setDetailOption = useExponentStore.use.setDetailOption();
    const detailCompanyId = useExponentStore.use.detailCompanyId();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const companyList = useExponentStore.use.companyList();

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

    const fetchCompanyLiveOddsDetail = async () => {
        try {
            const res = await getExponentDetail(matchDetail.matchId, detailCompanyId);

            if (!res.success) {
                throw new Error();
            }

            setDetailList(prevValue => ({
                ...prevValue,
                detailCompanyId: res.data
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = async (tab: TabListType) => {
        setDetailOption(companyList[tab][0], tab);

        if (companyList[tab][0] !== detailCompanyId && !(detailCompanyId in detailList)) {
            await fetchCompanyLiveOddsDetail();
        }
    };

    useEffect(() => {
        if (isOpen && !(detailCompanyId in detailList)) {
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
                            <DetailTable dataList={detailList[detailCompanyId][tabValue]} />
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </Drawer>
    );
}

export default ExponentInfoDrawer;
