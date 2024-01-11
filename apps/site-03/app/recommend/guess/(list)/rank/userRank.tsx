'use client';
import Image from 'next/image';
import Avatar from '@/components/avatar/avatar';
import Soccer from '../components/period/img/soccerWhite.png';
import weekBackground from '../img/weekBg.png';
import monthBackground from '../img/monthBg.png';
import seasonBackground from '../img/seasonBg.png';
import { useRankStore } from '../rankStore';
import style from './userRank.module.scss';

function UserRank({ status }: { status: 'week' | 'month' | 'season' }) {
    const weekMemberInfo = useRankStore.use.weekMemberInfo();
    const monthMemberInfo = useRankStore.use.monthMemberInfo();
    const seasonMemberInfo = useRankStore.use.seasonMemberInfo();
    const memberInfoMap = {
        week: weekMemberInfo,
        month: monthMemberInfo,
        season: seasonMemberInfo
    };

    const periodBackgroundMap = {
        week: weekBackground,
        month: monthBackground,
        season: seasonBackground
    };
    const periodMap = {
        week: '周',
        month: '月',
        season: '季'
    };
    const tagMap = {
        week: '#276ce1',
        month: '#3d7f53',
        season: '#cc4d2e'
    };
    const periodTagColor = tagMap[status];
    const memberInfo = memberInfoMap[status];

    return (
        <div className={style.userRank}>
            <Image
                alt=""
                className={style.background}
                src={periodBackgroundMap[status]}
                width={366}
            />
            <div className={style.ranking} style={{ background: periodTagColor }}>
                {periodMap[status]}排名
                <span>
                    {memberInfo.ranking === 0 || memberInfo.ranking > 50 ? '-' : memberInfo.ranking}
                </span>
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
                    <div className={style.detail}>
                        <div>战绩: {memberInfo.totalMatches}场</div>
                        <div>
                            胜负: {memberInfo.totalWin}/{memberInfo.totalLose}
                        </div>
                    </div>
                </div>
                <div className={style.winRateBlock}>
                    <Image alt="icon" className={style.icon} src={Soccer} />
                    <span className={style.winRate}>
                        <span>{memberInfo.hitRate}</span>
                        <span className={style.percent}>%</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserRank;
