'use client';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { Tabs, Tab } from 'ui';
import { timestampToString } from 'lib';
import style from './dashboard.module.scss';
import Filter from './components/filter/filter';
import { createAnalysisResultStore, useAnalyticsResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';

const resultList = {
    // 全場讓球
    fullHandicapUpper: [2504100, 2504100, 2504100],
    fullHandicapLower: [2504100, 2504100],
    fullHandicapDraw: [2504100, 2504100],
    fullHandicapUpperDaily: [1699280450, 1700475917, 1699280450],
    fullHandicapLowerDaily: [1699280450, 1700475917],
    fullHandicapDrawDaily: [1699280450, 1700475917],
    // 半場讓球
    halfHandicapUpper: [2504100],
    halfHandicapLower: [2504100],
    halfHandicapDraw: [2504100],
    halfHandicapUpperDaily: [1699280450],
    halfHandicapLowerDaily: [1699280450],
    halfHandicapDrawDaily: [1699280450],
    // 全場大小
    fullOverUnderUpper: [2504100],
    fullOverUnderLower: [2504100],
    fullOverUnderDraw: [2504100],
    fullOverUnderUpperDaily: [1699280450],
    fullOverUnderLowerDaily: [1699280450],
    fullOverUnderDrawDaily: [1699280450],
    // 半場大小
    halfOverUnderUpper: [2504100],
    halfOverUnderLower: [2504100],
    halfOverUnderDraw: [2504100],
    halfOverUnderUpperDaily: [1699280450],
    halfOverUnderLowerDaily: [1699280450],
    halfOverUnderDrawDaily: [1699280450],
    // 全場獨贏
    fullMoneyLineUpper: [2504100],
    fullMoneyLineLower: [2504100],
    fullMoneyLineDraw: [2504100],
    fullMoneyLineUpperDaily: [1699280450],
    fullMoneyLineLowerDaily: [1699280450],
    fullMoneyLineDrawDaily: [1699280450],
    // 半場獨贏
    halfMoneyLineUpper: [2504100],
    halfMoneyLineLower: [2504100],
    halfMoneyLineDraw: [2504100],
    halfMoneyLineUpperDaily: [1699280450],
    halfMoneyLineLowerDaily: [1699280450],
    halfMoneyLineDrawDaily: [1699280450],
    // 固定是6個object,代表6個時間區間
    minutesGoal: [
        {
            goalUpper: [2504100, 2504101],
            goalLower: [2504100]
        },
        {
            goalUpper: [2504100],
            goalLower: [2504100]
        },
        {
            goalUpper: [2504100],
            goalLower: [2504100]
        },
        {
            goalUpper: [2504100],
            goalLower: [2504100]
        },
        {
            goalUpper: [2504100],
            goalLower: [2504100]
        },
        {
            goalUpper: [2504100],
            goalLower: [2504100]
        }
    ],
    // 固定4個
    goalRange: {
        goalRange0To1: [2504100, 2504101],
        goalRange2To3: [2504100],
        goalRange4To6: [2504100],
        goalRange7Upper: [2504100]
    },
    // 固定26個
    exactGoal: {
        goalRange1To0: [2504100],
        goalRange0To1: [2504100],
        goalRange0To0: [2504100],
        goalRange2To0: [2504100],
        goalRange0To2: [2504100],
        goalRange1To1: [2504100],
        goalRange2To1: [2504100],
        goalRange1To2: [2504100],
        goalRange2To2: [2504100, 2504101],
        goalRange3To0: [2504100],
        goalRange0To3: [2504100],
        goalRange3To3: [2504100],
        goalRange3To1: [2504100],
        goalRange1To3: [2504100],
        goalRange4To4: [2504100],
        goalRange3To2: [2504100],
        goalRange2To3: [2504100],
        goalRange4To0: [2504100],
        goalRange0To4: [2504100],
        goalRange4To1: [2504100],
        goalRange1To4: [2504100],
        goalRange4To2: [2504100],
        goalRange2To4: [2504100],
        goalRange4To3: [2504100],
        goalRange3To4: [2504100],
        others: [2504100]
    }
};

const record = [
    {
        recordId: 1,
        recordTime: 1701771917,
        handicap: 'home',
        odds: '1',
        overUnder: '1',
        startDate: 1701771917,
        endDate: 1701771917,
        state: 0
    },
    {
        recordId: 2,
        recordTime: 1701771917,
        handicap: 'away',
        odds: '4+',
        overUnder: '1',
        startDate: 1701771917,
        endDate: 1701771917,
        state: 1
    }
];

function DetailLayout({ children }: { children: ReactNode }) {
    createAnalysisResultStore({
        analysisResultData: resultList,
        recordList: record
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    const [showFilter, setShowFilter] = useState(false);
    const route = usePathname().split('/');
    const params = useParams();
    const router = useRouter();

    const recordList = useAnalyticsResultStore.use.recordList();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();
    const setRecordData = useAnalyticsResultStore.use.setRecordData();
    const recordData = recordList.find(item => item.recordId.toString() === params.recordId);

    useEffect(() => {
        if (recordData) {
            setHandicapEchart(resultList);
            setRecordData(recordData);
        }
    }, [recordData, setHandicapEchart, setRecordData]);

    if (!params.recordId || !recordData) {
        router.push(`/bigData?status=analysis`);
        return;
    }

    const tabStyle = {
        gap: 4,
        swiperOpen: true,
        scrolling: true,
        buttonRadius: 30
    };

    const tabList = [
        {
            label: '讓球大小',
            to: `/bigData/${params.recordId as string}/handicap`,
            params: 'handicap'
        },
        {
            label: '15分鐘進球',
            to: `/bigData/${params.recordId as string}/minutes`,
            params: 'minutes'
        },
        {
            label: '進球數區間',
            to: `/bigData/${params.recordId as string}/range`,
            params: 'range'
        },
        {
            label: '全場波膽',
            to: `/bigData/${params.recordId as string}/bodan`,
            params: 'bodan'
        }
    ];

    const handicapTeam = {
        home: '主',
        away: '客'
    };

    return (
        <>
            <HeaderTitleFilter title="分析结果" />
            <div className={style.bigDataGame}>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>全場讓球</span>
                        <span className={style.name}>
                            讓方/{handicapTeam[recordData.handicap] || '全部'}、盤口/
                            {recordData.odds || '不挑選'}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全場大小</span>
                        <span className={style.name}>{recordData.overUnder || '不挑選'}</span>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>時間區間</span>
                        <span className={style.date}>
                            {timestampToString(recordData.startDate, 'YYYY-MM-DD')} ~{' '}
                            {timestampToString(recordData.endDate, 'YYYY-MM-DD')}
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.dashboard}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="flexStart"
                    scrolling={tabStyle.scrolling}
                    styling="button"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                {item.params === route[route.length - 1] ? children : ''}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <Filter
                isOpen={showFilter}
                onClose={() => {
                    setShowFilter(false);
                }}
                onOpen={() => {
                    setShowFilter(true);
                }}
            />
        </>
    );
}

export default DetailLayout;
