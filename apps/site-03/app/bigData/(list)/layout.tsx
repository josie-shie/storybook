'use client';
import { Suspense, type ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import AnimationData from './animationData';
import content from './img/content.png';
import style from './layout.module.scss';
import { creatDiscSelectStore } from './discSelectStore';
import { creatMatchFilterStore } from './matchFilterStore';
import { creatHandicapAnalysisStore } from './handicapAnalysisFormStore';
import { creatHintsFormStore } from './hintsFormStore';
import { creatAnimationDataStore, useAnimationDataStore } from './animationDataStore';
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

    creatAnimationDataStore({
        analysisTimes: true
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

    const analysisTimes = useAnimationDataStore.use.analysisTimes();

    return (
        <>
            <Header />
            <AnimationData />
            {analysisTimes ? (
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
            ) : (
                <div className={style.bg}>
                    <Image alt="content" src={content} />
                </div>
            )}
            <Footer />
        </>
    );
}

export default AnalysisLayout;
