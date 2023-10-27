'use client';
import type { Metadata } from 'next';
import ArticleItem from '../components/articleItem/articleItem';
import style from './masterList.module.scss';
import Header from '@/components/header/headerTitle';

export const metadata: Metadata = {
    title: '专家分析观点'
};

function MasterDetail() {
    const articleList = [
        {
            id: 116,
            name: '老蕭聊球',
            unlock: false,
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
            unlock: false,
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
            unlock: false,
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
    ];

    const headerProps = {
        title: '专家分析观点',
        total: 999999
    };
    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            <div className={style.masterList}>
                {articleList.map(item => (
                    <ArticleItem item={item} key={item.id} />
                ))}
            </div>
        </>
    );
}

export default MasterDetail;
