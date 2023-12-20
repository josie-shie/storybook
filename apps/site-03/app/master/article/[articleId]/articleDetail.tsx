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
    title: '专家预测'
};

function ArticleDetail({ params }: { params: { articleId: string } }) {
    const [article, setArticle] = useState({
        id: 281,
        matchId: 2419673,
        leagueId: 34,
        state: 0,
        leagueName: '',
        homeTeam: {
            id: 523,
            name: '',
            score: 0,
            logo: ''
        },
        awayTeam: {
            id: 158,
            name: '',
            score: 0,
            logo: ''
        },
        odds: {
            handicap: 0.25,
            homeTeamOdds: 1.09,
            awayTeamOdds: 0.79,
            overUnder: 2.5,
            overOdds: 1.04,
            underOdds: 0.82
        },
        mentorId: 41,
        mentorName: '',
        mentorImage: '',
        mentorLevel: 1,
        playType: 'HOMEAWAY' as GuessTeam,
        predictedPlay: 'LOCK' as PredictTypeWithLock,
        analysisTitle: '',
        analysisContent: '',
        price: 50,
        predictionResult: 'NONE' as GuessType,
        matchTime: 1706606662,
        createdAt: 1702371957,
        fansNumber: 1,
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

    const fetchData = async () => {
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
        void fetchData();
    }, []);

    return (
        <>
            <Header title={headerProps.title} />
            <Info article={article} setArticle={setArticle} />
            <ArticleContent article={article} params={params} />
        </>
    );
}

export default ArticleDetail;
