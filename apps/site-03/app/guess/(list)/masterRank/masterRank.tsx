'use client';
// import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import type { Ref } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { getGuessRank } from 'data-center';
import Avatar from '@/components/avatar/avatar';
import { useUserStore } from '@/store/userStore';
import HotStreakListItem from '../components/hotStreak/hotStreakListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import masterRankBackground from '../img/masterRankBg.png';
import Streak from '../components/hotStreak/img/whiteStreak.png';
import { useRankStore } from '../rankStore';
import style from './masterRank.module.scss';

function UserMasterRank() {
    const memberInfo = useRankStore.use.memberMasterRank();

    return (
        <div className={style.userHotStreak}>
            <Image alt="" className={style.background} src={masterRankBackground} width={366} />
            <div className={style.ranking}>
                你排名<span>{memberInfo.ranking === 0 ? '-' : memberInfo.ranking}</span>
            </div>
            <div className={style.container}>
                <div className={style.avatarContainer}>
                    <Avatar
                        src={
                            memberInfo.memberAvatar && memberInfo.memberAvatar !== '0'
                                ? memberInfo.memberAvatar
                                : ''
                        }
                    />
                </div>
                <div className={style.content}>
                    <div className={style.name}>{memberInfo.memberName}</div>
                    <div className={style.streak}>
                        <div className={style.current}>
                            <Image alt="streakIcon" className={style.streakIcon} src={Streak} />
                            <span className={style.label}>当前:</span>{' '}
                            {memberInfo.currentMaxWinStreak}連紅
                        </div>
                        <div className={style.highest}>
                            <Image alt="streakIcon" className={style.streakIcon} src={Streak} />
                            <span className={style.label}>历史最高:</span>{' '}
                            {memberInfo.historyMaxWinStreak}
                            連紅
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const RankList = forwardRef(function RankList(_, ref: Ref<HTMLDivElement>) {
    const [isLoading, setIsLoading] = useState(false);

    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();
    const setMember = useRankStore.use.setMemberMasterRank();
    const setMasterRankList = useRankStore.use.setMasterRankList();

    useEffect(() => {
        async function fetchMasterRank() {
            setIsLoading(true);
            const masterRank = await getGuessRank({
                memberId: isLogin ? userInfo.uid : 1,
                rankType: 3
            });
            if (masterRank.success) {
                const data = masterRank.data;
                setMember(data.memberRank);
                setMasterRankList(data.guessRank);
            }
            setIsLoading(false);
        }
        void fetchMasterRank();
    }, [isLogin, userInfo.uid, setIsLoading, setMasterRankList, setMember]);

    return (
        <div className={style.masterRank} ref={ref}>
            <div className={style.control}>
                <UserSwitch />
                <div className={style.right}>
                    {/* 1.5版先不做搜尋 */}
                    {/* <div className={style.search}>
                        <IconSearch size={16} />
                        <span>搜尋</span>
                    </div> */}
                    <Rule />
                </div>
            </div>
            {isLogin ? <UserMasterRank /> : null}
            <HotStreakListItem isLoading={isLoading} />
        </div>
    );
});

export default RankList;
