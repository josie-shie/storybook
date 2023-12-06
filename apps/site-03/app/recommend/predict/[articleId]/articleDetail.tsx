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
            mentorId: 229,
            mentorName: 'Josie的羅囉',
            mentorImage:
                'https://twtest8.s3.ap-northeast-1.amazonaws.com/a6e6524457f4778d83cecbdb7892df7b8170cb830a76d29470958221e78078ad.png',
            analysisTitle: '格鲁吉亚vs西班牙，来看我的精心推荐吧',
            analysisContent:
                '【推荐分析】赛事前瞻：乌兰巴托FC主队近5场3胜1平1负，台中未来客队近5场2胜2平1负，谁能更胜一筹。',
            homeTeam: {
                id: 2670,
                name: '泰国国立法政大学',
                logo: '0'
            },
            awayTeam: {
                id: 5397,
                name: '北曼谷学院',
                logo: '0'
            },
            matchTime: 1698667200,
            createdAt: 1698659314,
            leagueName: '女欧U19',
            predictionResult: 'NONE',
            playType: 'HOMEAWAY',
            odds: {
                handicap: -1.75,
                overUnder: 3
            },
            fansNumber: 34713,
            unlockNumber: 1000,
            hotStreak: 9,
            ranking: 10,
            followed: true,
            predictedPlay: 'LOCK',
            price: 10
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
