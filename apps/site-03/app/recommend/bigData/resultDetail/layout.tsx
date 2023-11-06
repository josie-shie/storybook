'use client';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Tabs, Tab } from 'ui';
import type { Metadata } from 'next';
import Image from 'next/image';
import style from './dashboard.module.scss';
import FilterIcon from './img/filter.png';
import Filter from './components/filter/filter';
import BigDataDetail from './bigDataDetail';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';

export const metadata: Metadata = {
    title: '分析結果'
};

function DetailLayout({ children }: { children: ReactNode }) {
    const [showFilter, setShowFilter] = useState(false);
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        scrolling: true,
        buttonRadius: 30
    };
    const tabList = [
        {
            label: '讓球大小',
            to: '/recommend/bigData/resultDetail/handicap'
        },
        {
            label: '15分鐘進球',
            to: '/recommend/bigData/resultDetail/minutes'
        },
        {
            label: '進球數區間',
            to: '/recommend/bigData/resultDetail/range'
        },
        {
            label: '全場波膽',
            to: '/recommend/bigData/resultDetail/bodan'
        }
    ];

    return (
        <>
            <HeaderTitleFilter title="分析結果">
                <Image
                    alt="filter"
                    className={style.mr}
                    onClick={() => {
                        setShowFilter(true);
                    }}
                    sizes="32"
                    src={FilterIcon}
                />
            </HeaderTitleFilter>
            <BigDataDetail />
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
                                {children}
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
