'use client';
import { Suspense, type ReactNode } from 'react';
import { useState } from 'react';
import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/app/userStore';
import AnimationData from './animationData';
import content from './img/content.png';
import style from './layout.module.scss';
import { creatDiscSelectStore } from './discSelectStore';
import { creatMatchFilterStore } from './matchFilterStore';
import { creatHintsFormStore } from './hintsFormStore';
import searchWhite from './img/searchWhite.png';
import RecordFilter from './components/recordFilter/recordFilter';

function AnalysisLayout({ children }: { children: ReactNode }) {
    const isVipUseAnalysis = useUserStore.use.isVipUseAnalysis();
    const setIsVipUseAnalysis = useUserStore.use.setIsVipUseAnalysis();
    const [showRecord, setShowRecord] = useState(false);
    creatDiscSelectStore({
        openNoramlDialog: false,
        dialogContentType: '',
        dialogContent: null
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });
    creatHintsFormStore({
        handicapTips: []
    });

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    const tabList = [
        {
            label: '智能盘路分析',
            to: '/bigData/analysis?status=analysis'
        },
        {
            label: '今日长龙赛事',
            to: '/bigData/analysis?status=tips'
        }
    ];

    const handleAnalysisTimes = (newTestValue: boolean) => {
        setIsVipUseAnalysis(newTestValue);
    };

    return (
        <>
            <Header background />
            <div className={style.bigDataWrapper}>
                <AnimationData
                    analysisTime={isVipUseAnalysis}
                    onUpdateAnalysis={handleAnalysisTimes}
                />
                {isVipUseAnalysis ? (
                    <div className={style.main} id="bigDataAnalysis">
                        <Tabs
                            buttonRadius={tabStyle.buttonRadius}
                            gap={tabStyle.gap}
                            position="center"
                            styling="button"
                            swiperOpen={tabStyle.swiperOpen}
                        >
                            {tabList.map(item => {
                                return (
                                    <Tab key={item.label} label={item.label} to={item.to}>
                                        <Suspense fallback={<Loading />}>{children}</Suspense>
                                    </Tab>
                                );
                            })}
                        </Tabs>
                    </div>
                ) : (
                    <div className={style.bg}>
                        <div
                            className={style.record}
                            onClick={() => {
                                setShowRecord(true);
                            }}
                        >
                            <Image alt="" height={20} src={searchWhite.src} width={20} />
                            分析纪录
                        </div>
                        <Image alt="content" src={content} />
                    </div>
                )}
            </div>

            <Footer />
            <RecordFilter
                isOpen={showRecord}
                onClose={() => {
                    setShowRecord(false);
                }}
                onOpen={() => {
                    setShowRecord(true);
                }}
            />
        </>
    );
}

export default AnalysisLayout;
