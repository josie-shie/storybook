'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { getPostDetail } from 'data-center';
import { type GetPostDetailResponse } from 'data-center';
import Header from '@/components/header/headerTitle';
import type { GuessTeam, GuessType, PredictTypeWithLock } from '@/types/predict';
import Info from './info';
import ArticleContent from './articleContent';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
};

function ArticleDetail({ params }: { params: { articleId: string } }) {
    const [article, setArticle] = useState({
        id: 0,
        matchId: 0,
        leagueId: 0,
        state: 0,
        leagueName: '',
        homeTeam: {
            id: 0,
            name: '',
            score: 0,
            logo: ''
        },
        awayTeam: {
            id: 0,
            name: '',
            score: 0,
            logo: ''
        },
        odds: {
            handicap: 0,
            homeTeamOdds: 0,
            awayTeamOdds: 0,
            overUnder: 0,
            overOdds: 0,
            underOdds: 0
        },
        mentorId: 0,
        mentorName: '',
        mentorImage: '',
        mentorLevel: 1,
        playType: 'HOMEAWAY' as GuessTeam,
        predictedPlay: 'NONE' as PredictTypeWithLock,
        analysisTitle: '',
        analysisContent: '',
        price: 0,
        predictionResult: 'NONE' as GuessType,
        matchTime: 0,
        createdAt: 0,
        fansNumber: 0,
        unlockNumber: 0,
        followed: true,
        tag: {
            id: 0,
            tagName: '',
            note: '',
            colorCode: '',
            weekHitRecentTen: 0,
            weekMaxAccurateStreak: 0,
            weekHitMatches: 0,
            weekTotalMatches: 0,
            weekHitRate: 0,
            weekHitRateDisplay: '',
            weekRanking: 0,
            weekHistoryMaxWinStreak: 0,
            monthHitRecentTen: 0,
            monthMaxAccurateStreak: 0,
            monthHitMatches: 0,
            monthTotalMatches: 0,
            monthHitRate: 0,
            monthHitRateDisplay: '',
            monthRanking: 0,
            monthHistoryMaxWinStreak: 0,
            quarterHitRecentTen: 0,
            quarterMaxAccurateStreak: 0,
            quarterHitMatches: 0,
            quarterTotalMatches: 0,
            quarterHitRate: 0,
            quarterHitRateDisplay: '',
            quarterRanking: 0,
            quarterHistoryMaxWinStreak: 0,
            winHitRecentTen: 0,
            winMaxAccurateStreak: 0,
            winHitMatches: 0,
            winTotalMatches: 0,
            winHitRate: 0,
            winHitRateDisplay: '',
            winRanking: 0,
            winHistoryMaxWinStreak: 0
        }
    } as GetPostDetailResponse);
    const headerProps = {
        title: '专家预测文章'
    };

    const fetchPostDetail = async () => {
        try {
            const res = await getPostDetail({ postId: Number(params.articleId) });
            if (!res.success) {
                return new Error();
            }

            setArticle(res.data);
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchPostDetail();
    }, []);

    return (
        <>
            <Header srcPath="/master/article" title={headerProps.title} />
            <Info article={article} setArticle={setArticle} />
            <ArticleContent article={article} fetchPostDetail={fetchPostDetail} params={params} />
        </>
    );
}

export default ArticleDetail;
