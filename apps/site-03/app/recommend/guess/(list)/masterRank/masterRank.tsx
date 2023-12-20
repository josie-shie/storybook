'use client';
// import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { getGuessRank } from 'data-center';
import Avatar from '@/components/avatar/avatar';
import { useUserStore } from '@/app/userStore';
import HotStreakListItem from '../components/hotStreak/hotStreakListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import masterRankBackground from '../img/masterRankBg.png';
import Streak from '../components/hotStreak/img/whiteStreak.png';
import { creatMasterRankStore, useMasterRankStore } from './masterRankStore';
import style from './masterRank.module.scss';

function UserMasterRank() {
    const userInfo = useUserStore.use.userInfo();
    const memberInfo = useMasterRankStore.use.member();
    const setMember = useMasterRankStore.use.setMember();
    const setMasterRankList = useMasterRankStore.use.setMasterRankList();

    useEffect(() => {
        async function fetchMasterRank() {
            const masterRank = await getGuessRank({
                memberId: userInfo.uid,
                rankType: 3
            });
            if (masterRank.success) {
                const data = masterRank.data;
                setMember(data.memberRank);
                setMasterRankList(data.guessRank);
            }
        }
        void fetchMasterRank();
    }, []);

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

function RankList() {
    const isLogin = useUserStore.use.isLogin();
    creatMasterRankStore({
        member: {
            memberId: 0,
            memberName: '-',
            memberLevel: 0,
            memberAvatar: '',
            ranking: 0,
            today: false,
            totalMatches: 0,
            totalWin: 0,
            totalLose: 0,
            hitRate: 0,
            currentMaxWinStreak: 0,
            historyMaxWinStreak: 0
        },
        onlyShowToday: true,
        masterRankList: []
    });

    return (
        <div className={style.masterRank}>
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
            <HotStreakListItem />
        </div>
    );
}

export default RankList;
