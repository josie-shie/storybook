'use client';
// import { IconSearch } from '@tabler/icons-react';
import { getGuessRank } from 'data-center';
import type { Ref } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { useUserStore } from '@/app/userStore';
import PeriodListItem from '../components/period/periodListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import { useRankStore } from '../rankStore';
import style from './rank.module.scss';
import UserRank from './userRank';

const rankTypeMap: Record<string, 0 | 1 | 2> = {
    week: 0,
    month: 1,
    season: 2
};

const Rank = forwardRef(function Rank(
    { status }: { status: 'week' | 'month' | 'season' },
    ref: Ref<HTMLDivElement>
) {
    const [isLoading, setIsLoading] = useState(false);
    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();

    const setWeekMemberInfo = useRankStore.use.setWeekMemberInfo();
    const setMonthMemberInfo = useRankStore.use.setMonthMemberInfo();
    const setSeasonMemberInfo = useRankStore.use.setSeasonMemberInfo();
    const setWeekRankList = useRankStore.use.setWeekRankList();
    const setMonthRankList = useRankStore.use.setMonthRankList();
    const setSeasonRankList = useRankStore.use.setSeasonRankList();

    useEffect(() => {
        async function fetchGuessRank() {
            setIsLoading(true);
            const memberRank = await getGuessRank({
                memberId: isLogin ? userInfo.uid : 1,
                rankType: rankTypeMap[status]
            });
            if (memberRank.success) {
                const data = memberRank.data;
                if (status === 'week') {
                    setWeekMemberInfo(data.memberRank);
                    setWeekRankList(data.guessRank);
                }
                if (status === 'month') {
                    setMonthMemberInfo(data.memberRank);
                    setMonthRankList(data.guessRank);
                }
                if (status === 'season') {
                    setSeasonMemberInfo(data.memberRank);
                    setSeasonRankList(data.guessRank);
                }
            }
            setIsLoading(false);
        }
        void fetchGuessRank();
    }, [
        status,
        isLogin,
        userInfo.uid,
        setMonthMemberInfo,
        setMonthRankList,
        setSeasonMemberInfo,
        setSeasonRankList,
        setWeekMemberInfo,
        setWeekRankList
    ]);

    return (
        <div className={style.rank} ref={ref}>
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
            {isLogin ? <UserRank status={status} /> : null}
            <PeriodListItem isLoading={isLoading} status={status} />
        </div>
    );
});

export default Rank;
