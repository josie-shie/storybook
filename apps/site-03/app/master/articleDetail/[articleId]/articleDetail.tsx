'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { getPostDetail, getMemberProfileWithMemberId } from 'data-center';
import { type GetPostDetailResponse, GetMemberProfileWithMemberIdResponse } from 'data-center';
import type { GuessTeam, GuessType, PredictTypeWithLock } from '@/types/predict';
import Info from './info';
import ArticleContent from './articleContent';
import { useUserStore } from '@/store/userStore';

export const metadata: Metadata = {
    title: '专家预测 | FutureSport'
};

function ArticleDetail({ params }: { params: { articleId: string } }) {
    const userInfo = useUserStore.use.userInfo();
    const [isNoInfoData, setIsNoInfoData] = useState(true);
    const [isNoArticleData, setIsNoArticleData] = useState(true);
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

    const [info, setInfo] = useState({
        memberId: 0,
        username: '',
        avatarPath: '',
        profile: '',
        fansCount: 0,
        unlockedCount: 0,
        mentorArticleCount: {
            predictedPlay: '',
            counts: 0
        },
        hitRate: 0,
        isFollowed: false,
        highlights: {
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
    } as GetMemberProfileWithMemberIdResponse);

    const fetchPostDetail = async () => {
        try {
            const res = await getPostDetail({ postId: Number(params.articleId) });
            if (!res.success) {
                return new Error();
            }

            setArticle(res.data);
            setIsNoArticleData(false);

            const memberProfileInfo = await getMemberProfileWithMemberId({
                loginMemberId: userInfo.uid || 0,
                memberId: res.data.mentorId
            });

            if (!memberProfileInfo.success) {
                return new Error();
            }

            setInfo(memberProfileInfo.data);
            setIsNoInfoData(false);
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchPostDetail();
    }, []);

    return (
        <>
            <Info
                article={article}
                info={info}
                isNoInfoData={isNoInfoData}
                setArticle={setArticle}
            />
            <ArticleContent
                article={article}
                isNoArticleData={isNoArticleData}
                fetchPostDetail={fetchPostDetail}
                params={params}
            />
        </>
    );
}

export default ArticleDetail;
