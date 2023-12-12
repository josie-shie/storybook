'use client';
import type { ReactNode } from 'react';
import { creatArticleStore } from './myAnalysisStore';

function MyAnaylsisLayout({ children }: { children: ReactNode }) {
    creatArticleStore({
        articleList: []
        // articleList: [
        //     {
        //         id: 116,
        //         name: '老萧聊球',
        //         unlock: true,
        //         unlockNumber: 5,
        //         hotStreak: 9,
        //         ranking: 10,
        //         title: '【11连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
        //         cupName: '欧锦U20A',
        //         cupTime: '09-05 16:45',
        //         homeTeam: '德国U20A',
        //         awayTeam: '斯洛文尼亚U20',
        //         postTime: '17:45'
        //     },
        //     {
        //         id: 563,
        //         name: '老梁聊球',
        //         unlock: true,
        //         unlockNumber: 5,
        //         hotStreak: 2,
        //         ranking: 10,
        //         title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
        //         cupName: '欧锦U20A',
        //         cupTime: '09-05 16:45',
        //         homeTeam: '德国U20A',
        //         awayTeam: '斯洛文尼亚U20',
        //         postTime: '17:45'
        //     },
        //     {
        //         id: 564,
        //         name: '老梁聊球',
        //         unlock: true,
        //         unlockNumber: 5,
        //         hotStreak: 2,
        //         ranking: 10,
        //         title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
        //         cupName: '欧锦U20A',
        //         cupTime: '09-05 16:45',
        //         homeTeam: '德国U20A',
        //         awayTeam: '斯洛文尼亚U20',
        //         postTime: '17:45'
        //     },
        //     {
        //         id: 565,
        //         name: '老梁聊球',
        //         unlock: true,
        //         unlockNumber: 5,
        //         hotStreak: 2,
        //         ranking: 10,
        //         title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
        //         cupName: '欧锦U20A',
        //         cupTime: '09-05 16:45',
        //         homeTeam: '德国U20A',
        //         awayTeam: '斯洛文尼亚U20',
        //         postTime: '17:45'
        //     },
        //     {
        //         id: 566,
        //         name: '老梁聊球',
        //         unlock: true,
        //         unlockNumber: 5,
        //         hotStreak: 2,
        //         ranking: 10,
        //         title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
        //         cupName: '欧锦U20A',
        //         cupTime: '09-05 16:45',
        //         homeTeam: '德国U20A',
        //         awayTeam: '斯洛文尼亚U20',
        //         postTime: '17:45'
        //     },
        //     {
        //         id: 567,
        //         name: '老梁聊球',
        //         unlock: true,
        //         unlockNumber: 5,
        //         hotStreak: 2,
        //         ranking: 10,
        //         title: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
        //         cupName: '欧锦U20A',
        //         cupTime: '09-05 16:45',
        //         homeTeam: '德国U20A',
        //         awayTeam: '斯洛文尼亚U20',
        //         postTime: '17:45'
        //     }
        // ]
    });

    return <>{children}</>;
}

export default MyAnaylsisLayout;
