'use client';
import type { Metadata } from 'next';
import Info from './info';
import ArticleContent from './articleContent';
import { creatArticleStore } from './articleStore';
import Header from '@/components/header/headerTitle';

export const metadata: Metadata = {
    title: '专家预测'
};

function MasterDetail({ params }: { params: { articleId: string } }) {
    const headerProps = {
        title: '专家预测',
        total: 999999
    };

    creatArticleStore({
        articleDetail: {
            id: 1,
            master: {
                id: 0,
                avatar: '',
                name: '老梁聊球',
                hotStreak: 9,
                ranking: 10,
                followed: true,
                unlockNumber: 1000,
                fansNumber: 34713
            },
            postTime: 1701679456,
            title: '格鲁吉亚vs西班牙，来看我的精心推荐吧',
            leagueName: '歐錦U20A',
            dateTime: 1701679456,
            homeTeamLogo: '',
            homeTeamName: '泰国国立法政大学',
            awayTeamLogo: '',
            awayTeamName: '北曼谷学院',
            content:
                '【推荐分析】赛事前瞻：乌兰巴托FC主队近5场3胜1平1负，台中未来客队近5场2胜2平1负，谁能更胜一筹。',
            unlock: false,
            homeHandicap: 0.5,
            awayHandicap: -0.5,
            guessResult: 'none',
            masterGuess: 'home'
        },
        recommendationList: [
            {
                id: 1,
                postTime: 1701679456,
                leagueName: '欧锦U20A',
                dateTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                handicap: 'handicap',
                amount: 20,
                lockCount: 5
            },
            {
                id: 2,
                postTime: 1701679456,
                leagueName: '欧锦U20A',
                dateTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                handicap: 'handicap',
                amount: 20,
                lockCount: 5
            },
            {
                id: 3,
                postTime: 1701679456,
                leagueName: '欧锦U20A',
                dateTime: 1701679456,
                homeTeamName: '德國U20A',
                awayTeamName: '斯洛文尼亚U20',
                handicap: 'overUnder',
                amount: 20,
                lockCount: 5
            }
        ]
    });
    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            <Info />
            <ArticleContent params={params} />
        </>
    );
}

export default MasterDetail;
