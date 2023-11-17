'use client';
import { useSearchParams } from 'next/navigation';
import { creatArticleStore } from './components/articleItem/articleStore';
import AnalysisItem from './components/analysisItem/analysisItem';
import ArticleItem from './components/articleItem/articleItem';
import style from './myAnalysis.module.scss';

function MyAnaylsis() {
    const searchParams = useSearchParams();
    const search = searchParams.get('status');
    creatArticleStore({
        articleList: [
            {
                id: 116,
                name: '老蕭聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 9,
                ranking: 10,
                title: '【11连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 563,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 564,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 565,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 566,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            },
            {
                id: 567,
                name: '老梁聊球',
                unlock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                cupName: '欧锦U20A',
                cupTime: '09-05 16:45',
                homeTeam: '德國U20A',
                awayTeam: '斯洛文尼亚U20',
                postTime: '17:45'
            }
        ]
    });

    return (
        <div className={style.myAnalysis}>
            {search === 'unlock' ? (
                <ArticleItem />
            ) : (
                <>
                    <AnalysisItem />
                    <AnalysisItem />
                    <AnalysisItem />
                    <AnalysisItem />
                    <AnalysisItem />
                    <AnalysisItem />
                    <AnalysisItem />
                    <AnalysisItem />
                </>
            )}
        </div>
    );
}

export default MyAnaylsis;
