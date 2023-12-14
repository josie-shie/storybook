'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Soccer from '../components/period/img/soccerWhite.png';
import weekBackground from '../img/weekBg.png';
import monthBackground from '../img/monthBg.png';
import seasonBackground from '../img/seasonBg.png';
import style from './userRank.module.scss';
import { useRankStore } from './rankStore';
import Avatar from '@/components/avatar/avatar';

interface PeriodBackgroundMap {
    week: string;
    month: string;
    season: string;
}

function UserRank() {
    const memberInfo = useRankStore.use.member();
    const searchParams = useSearchParams();
    const currentPeriod = searchParams.get('status') as keyof PeriodBackgroundMap;

    const periodBackgroundMap = {
        week: weekBackground,
        month: monthBackground,
        season: seasonBackground
    };
    const periodMap = {
        week: '週',
        month: '月',
        season: '季'
    };
    const tagMap = {
        week: '#276ce1',
        month: '#3d7f53',
        season: '#cc4d2e'
    };
    const periodTagColor = tagMap[currentPeriod];

    return (
        <div className={style.userRank}>
            <Image
                alt=""
                className={style.background}
                src={periodBackgroundMap[currentPeriod]}
                width={366}
            />
            <div className={style.ranking} style={{ background: periodTagColor }}>
                {periodMap[currentPeriod]}排名
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
