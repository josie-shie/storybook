'use client';
import Image from 'next/image';
import { useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToMonthDay, timestampToString } from 'lib';
import WeekButton from '../components/weekButton/weekButton';
import { creatArticleStore, useArticleStore } from './articleStore';
import style from './article.module.scss';
import Win from './img/win.png';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import UnlockButton from '@/components/unlockButton/unlockButton';

function PredictItem() {
    const router = useRouter();
    const articleList = useArticleStore.use.articleList();

    const goDetail = () => {
        router.push('/recommend/predict/275');
    };

    const goInfo = () => {
        router.push('/recommend/predict/masterAvatar?status=analysis');
    };

    return (
        <>
            {articleList.map(item => {
                return (
                    <div className={style.articleItem} key={item.id}>
                        <div className={style.user}>
                            <div className={style.avatarContainer} onClick={goInfo}>
                                <Avatar borderColor="#4489FF" />
                            </div>
                            <div className={style.userInfo}>
                                <div className={style.userName}>{item.mentorName}</div>
                                <div className={style.tagsContainer}>
                                    {item.hotStreak > 0 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
                                            text={`${item.hotStreak}連紅`}
                                        />
                                    )}
                                    <Tag background="#4489FF" text={`月榜 ${item.ranking}`} />
                                </div>
                            </div>
                            <div className={style.unlockStatus}>
                                {item.isLock ? (
                                    <span className={style.unlocked}>已解鎖</span>
                                ) : (
                                    <>
                                        <UnlockButton />
                                        <span className={style.unlockNumber}>
                                            已有{item.unlockNumber}人解鎖
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={style.title}>{item.analysisTitle}</div>
                        <div className={style.game} onClick={goDetail}>
                            <div className={style.detail}>
                                {item.leagueName}
                                <span className={style.time}>
                                    | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                </span>
                            </div>
                            <div className={style.combination}>
                                {item.homeTeamName} vs {item.awayTeamName}
                            </div>
                            {item.predictionResult === 'WIN' && (
                                <Image alt="" height={36} src={Win} width={36} />
                            )}
                        </div>
                        <div className={style.postTime}>
                            发表于今天 {timestampToMonthDay(item.createdAt)}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

function PredictList() {
    const [isActive, setIsActive] = useState<number[]>([]);

    const updateActive = (value: number) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
    };
    creatArticleStore({
        articleList: [
            {
                id: 116,
                mentorName: '老蕭聊球',
                isLock: true,
                unlockNumber: 5,
                hotStreak: 9,
                ranking: 10,
                analysisTitle: '【11连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                leagueName: '欧锦U20A',
                matchTime: 1698667200,
                awayTeamName: '德國U20A',
                homeTeamName: '斯洛文尼亚U20',
                createdAt: 1698667200,
                predictionResult: 'WIN'
            },
            {
                id: 563,
                mentorName: '老梁聊球',
                isLock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                analysisTitle: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                leagueName: '欧锦U20A',
                matchTime: 1698667200,
                awayTeamName: '德國U20A',
                homeTeamName: '斯洛文尼亚U20',
                createdAt: 1698667200,
                predictionResult: 'NONE'
            },
            {
                id: 564,
                mentorName: '老梁聊球',
                isLock: true,
                unlockNumber: 5,
                hotStreak: 2,
                ranking: 10,
                analysisTitle: '【7连胜】格鲁吉亚vs西班牙，来看我的精心推荐吧',
                leagueName: '欧锦U20A',
                matchTime: 1698667200,
                awayTeamName: '德國U20A',
                homeTeamName: '斯洛文尼亚U20',
                createdAt: 1698667200,
                predictionResult: 'WIN'
            }
        ]
    });

    return (
        <>
            <div className={style.button}>
                <WeekButton isActive={isActive} updateActive={updateActive} />
            </div>
            <div className={style.article}>
                <PredictItem />
            </div>
        </>
    );
}

export default PredictList;
