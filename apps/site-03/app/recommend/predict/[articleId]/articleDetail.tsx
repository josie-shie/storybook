'use client';

import type { Metadata } from 'next';
import { type GetPostDetailResponse } from 'data-center';
import Info from './info';
import ArticleContent from './articleContent';
import { creatArticleStore } from './articleStore';
import Header from '@/components/header/headerTitle';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterDetail({
    params,
    articleDetail
}: {
    params: { articleId: string };
    articleDetail: GetPostDetailResponse;
}) {
    const headerProps = {
        title: '专家预测'
    };

    creatArticleStore({
        articleDetail,
        recommendationList: [
            {
                id: 1,
                createdAt: 1701679456,
                leagueName: '欧锦U20A',
                matchTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                price: 20,
                predictPlayType: 'overUnder',
                unlockNumber: 8,
                isLock: true
            },
            {
                id: 2,
                createdAt: 1701679456,
                leagueName: '欧锦U20A',
                matchTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                price: 20,
                predictPlayType: 'overUnder',
                unlockNumber: 8,
                isLock: true
            },
            {
                id: 3,
                createdAt: 1701679456,
                leagueName: '欧锦U20A',
                matchTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                price: 20,
                predictPlayType: 'handicap',
                unlockNumber: 8,
                isLock: false
            }
        ]
    });
    return (
        <>
            <Header title={headerProps.title} />
            <Info />
            <ArticleContent params={params} />
        </>
    );
}

export default MasterDetail;
