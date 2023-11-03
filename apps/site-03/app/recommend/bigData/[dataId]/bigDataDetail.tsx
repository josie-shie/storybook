'use client';
import type { Metadata } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import style from './bigDataDetail.module.scss';
import FilterIcon from './img/filter.png';
import Filter from './components/filter/filter';
import Dashboard from './dashboard';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';

export const metadata: Metadata = {
    title: '分析結果'
};

function BigDataDetail() {
    const [showFilter, setShowFilter] = useState(false);
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
            <div className={style.bigDataGame}>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>全場讓球</span>
                        <span className={style.name}>讓方/主隊、盤口/2</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全場大小</span>
                        <span className={style.name}>不挑選</span>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>時間區間</span>
                        <span className={style.date}>2023-10-09 ~ 2023-10-16</span>
                    </div>
                </div>
            </div>
            <Dashboard />
            <Filter
                isOpen={showFilter}
                onClose={() => {
                    setShowFilter(false);
                }}
                onOpen={() => {
                    setShowFilter(true);
                }}
            />
            {/* <GuessBar />
            <Dashboard /> */}
        </>
    );
}

export default BigDataDetail;
