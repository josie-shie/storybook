import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { Tab, Tabs } from 'ui';
import type { RequestPlayType } from 'data-center';
import { getOddsRunning } from 'data-center';
import { useEffect } from 'react';
import { useSituationStore } from '@/app/football/[matchId]/situationStore';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useLiveContestStore } from '@/store/liveContestStore';
import leftBlackIcon from '../../img/left_black.png';
import style from './oddsDetailDrawer.module.scss';
import OddLiveTable from './oddLiveTable';

function ScroeBar() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useLiveContestStore.use.contestInfo();
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
    const liveOddsData = useSituationStore.use.liveOddsData();
    const setLiveOddsData = useSituationStore.use.setLiveOddsData();
    const companyNameMap = useContestDetailStore.use.companyNameMap();
    const companyId = useSituationStore.use.companyId();

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const tabList = [
        { label: '全让分', value: 'HANDICAP' },
        { label: '半让分', value: 'HANDICAPHALF' },
        { label: '全总进球', value: 'OVERUNDER' },
        { label: '半总进球', value: 'OVERUNDERHALF' },
        { label: '全胜平负', value: 'EUROPE' },
        { label: '半胜平负', value: 'EUROPEHALF' }
    ];

    const fetchCompanyLiveOddsDetail = async (tab?: RequestPlayType) => {
        try {
            const res = await getOddsRunning(matchDetail.matchId, companyId, tab || tabValue);

            if (!res.success) {
                throw new Error();
            }

            setLiveOddsData(res.data);
        } catch (error) {
            throw new Error();
        }
    };

    const handleChange = async (newValue: RequestPlayType) => {
        setTabValue(newValue);
        await fetchCompanyLiveOddsDetail(newValue);
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
                            <OddLiveTable dataList={liveOddsData} />
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </Drawer>
    );
}

export default HandicapDrawer;
