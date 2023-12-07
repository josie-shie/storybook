'use client';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { Tabs, Tab } from 'ui';
import { timestampToString } from 'lib';
import { creatMatchFilterStore } from './matchFilterStore';
import style from './dashboard.module.scss';
import Filter from './components/filter/filter';
import { createAnalysisResultStore, useAnalyticsResultStore } from './analysisResultStore';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';

const resultList = {
    // 全場讓球
    fullHandicapUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullHandicapLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullHandicapDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullHandicapUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullHandicapLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullHandicapDrawDaily: [1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394],
    // 半場讓球
    halfHandicapUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfHandicapLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfHandicapDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfHandicapUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfHandicapLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfHandicapDrawDaily: [1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394],
    // 全場大小
    fullOverUnderUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullOverUnderLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullOverUnderDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullOverUnderUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullOverUnderLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullOverUnderDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 半場大小
    halfOverUnderUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfOverUnderLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfOverUnderDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfOverUnderUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfOverUnderLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfOverUnderDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 全場獨贏
    fullMoneyLineUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullMoneyLineLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullMoneyLineDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullMoneyLineUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullMoneyLineLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullMoneyLineDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 半場獨贏
    halfMoneyLineUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfMoneyLineLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfMoneyLineDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfMoneyLineUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfMoneyLineLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfMoneyLineDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 固定是6個object,代表6個時間區間
    minutesGoal: [
        {
            goalUpper: [2504100, 2504101],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        }
    ],
    // 固定4個
    goalRange: {
        goalRange0To1: [2504100, 2504101],
        goalRange2To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To6: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange7Upper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
    },
    // 固定26個
    exactGoal: {
        goalRange1To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To2: [2504100, 2504101],
        goalRange3To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        others: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
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

    const backHandler = () => {
        router.push('/bigData?status=analysis');
    };

    return (
        <>
            <HeaderTitleFilter backHandler={backHandler} title="分析结果" />
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
