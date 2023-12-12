'use client';
import { Tabs, Tab } from 'ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { timestampToString } from 'lib';
import style from './dashboard.module.scss';
import Handicap from './(dashboard)/handicap/handicap';
import { createAnalysisResultStore } from './analysisResultStore';
import type { AnalysisResult, BigDataRecordListResponse } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';

function AnalysisResult({
    children,
    analysisData,
    recordList
}: {
    children: ReactNode;
    analysisData: AnalysisResult;
    recordList: BigDataRecordListResponse[];
}) {
    const route = usePathname().split('/');
    const router = useRouter();
    const params = useParams();
    const recordId = params.recordId;
    const recordData = recordList.find(item => item.recordId.toString() === recordId);

    createAnalysisResultStore({
        analysisResultData: analysisData,
        recordList,
        recordData: recordData || ({} as BigDataRecordListResponse)
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

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
                            讓方/{(recordData && handicapTeam[recordData.handicap]) || '全部'}
                            、盤口/
                            {recordData?.odds || '不挑選'}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全場大小</span>
                        <span className={style.name}>{recordData?.overUnder || '不挑選'}</span>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>時間區間</span>
                        <span className={style.date}>
                            {recordData
                                ? timestampToString(recordData.startDate, 'YYYY-MM-DD')
                                : ''}{' '}
                            ~{' '}
                            {recordData ? timestampToString(recordData.endDate, 'YYYY-MM-DD') : ''}
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.dashboard}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    defaultValue={
                        route[route.length - 1] === params.recordId.toString() ? 0 : undefined
                    }
                    fullBlock={
                        route[route.length - 1] === params.recordId.toString() ||
                        route[route.length - 1] === 'handicap'
                    }
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

                                {route[route.length - 1] === params.recordId.toString() &&
                                    item.params === 'handicap' && <Handicap />}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </>
    );
}

export default AnalysisResult;
