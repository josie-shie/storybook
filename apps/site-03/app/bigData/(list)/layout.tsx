'use client';
import { Suspense, type ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import AnimationData from './animationData';
import style from './layout.module.scss';
import { creatDiscSelectStore } from './discSelectStore';
import { creatMatchFilterStore } from './matchFilterStore';
import { creatHandicapAnalysisStore } from './handicapAnalysisFormStore';
import { creatHintsFormStore } from './hintsFormStore';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import Loading from '@/components/loading/loading';

function AnalysisLayout({ children }: { children: ReactNode }) {
    creatDiscSelectStore({
        openNoramlDialog: false
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });
    creatHandicapAnalysisStore({
        recordList: []
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
            label: '盘路分析',
            to: '/bigData?status=analysis'
        },
        {
            label: '盘路提示',
            to: '/bigData?status=tips'
        }
    ];

    return (
        <>
            <Header />
            <AnimationData />
            <div className={style.main}>
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
            <Footer />
        </>
    );
}

export default AnalysisLayout;
