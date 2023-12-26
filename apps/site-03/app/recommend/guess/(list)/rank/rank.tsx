'use client';
// import { IconSearch } from '@tabler/icons-react';
import { getGuessRank } from 'data-center';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from '@/app/userStore';
import PeriodListItem from '../components/period/periodListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import { creatRankStore, useRankStore } from './rankStore';
import style from './rank.module.scss';
import UserRank from './userRank';

interface PeriodBackgroundMap {
    week: string;
    month: string;
    season: string;
}

function Rank() {
    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();
    const searchParams = useSearchParams();
    const currentPeriod = searchParams.get('status') as keyof PeriodBackgroundMap;
    const rankTypeMap: Record<string, 0 | 1 | 2> = {
        week: 0,
        month: 1,
        season: 2
    };
    creatRankStore({ rankList: [] });
    const setMember = useRankStore.use.setMember();
    const setRankList = useRankStore.use.setRankList();

    useEffect(() => {
        async function fetchGuessRank() {
            const memberRank = await getGuessRank({
                memberId: isLogin ? userInfo.uid : 1,
                rankType: rankTypeMap[currentPeriod]
            });
            if (memberRank.success) {
                const data = memberRank.data;
                setMember(data.memberRank);
                setRankList(data.guessRank);
            }
        }
        void fetchGuessRank();
    }, [currentPeriod, isLogin]);

    return (
        <div className={style.rank}>
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
            {isLogin ? <UserRank /> : null}
            <PeriodListItem />
        </div>
    );
}

export default Rank;
