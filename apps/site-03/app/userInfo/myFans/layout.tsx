'use client';
import type { ReactNode } from 'react';
import { creatFansMemberStore } from './myFansStore';

function MyFocusLayout({ children }: { children: ReactNode }) {
    creatFansMemberStore({
        // fansMemberItem: []
        fansMemberItem: [
            {
                memberId: 12,
                username: '老蕭聊球',
                avatarPath:
                    'https://twtest8.s3.ap-northeast-1.amazonaws.com/2f78f7689030e7c61111d18a9655e4b2effbfaf0b14c98f8bce7a28bdc45f8af.png',
                profile: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！',
                fans: 34516,
                unlocked: 1800,
                hotStreak: 2,
                ranking: 10,
                followed: false
            },
            {
                memberId: 13,
                username: '老劉聊球',
                avatarPath:
                    'https://twtest8.s3.ap-northeast-1.amazonaws.com/2f78f7689030e7c61111d18a9655e4b2effbfaf0b14c98f8bce7a28bdc45f8af.png',
                profile: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！',
                fans: 34516,
                unlocked: 1800,
                hotStreak: 2,
                ranking: 10,
                followed: true
            },
            {
                memberId: 14,
                username: '老王聊球',
                avatarPath: '',
                profile: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！',
                fans: 34516,
                unlocked: 1800,
                hotStreak: 2,
                ranking: 10,
                followed: false
            },
            {
                memberId: 15,
                username: '老梁聊球',
                avatarPath: '',
                profile: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！',
                fans: 34516,
                unlocked: 1800,
                hotStreak: 2,
                ranking: 10,
                followed: true
            },
            {
                memberId: 16,
                username: '老梁聊球',
                avatarPath: '',
                profile: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！',
                fans: 34516,
                unlocked: 1800,
                hotStreak: 2,
                ranking: 10,
                followed: true
            },
            {
                memberId: 17,
                username: '老梁聊球',
                avatarPath: '',
                profile: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！',
                fans: 34516,
                unlocked: 1800,
                hotStreak: 2,
                ranking: 10,
                followed: false
            }
        ]
    });

    return <>{children}</>;
}

export default MyFocusLayout;
