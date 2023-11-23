'use client';
import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useArticleStore } from '../../articleStore';
import style from './articleItem.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import UnlockButton from '@/components/unlockButton/unlockButton';

function ArticleItem() {
    const router = useRouter();
    const articleList = useArticleStore.use.articleList();

    const goDetail = () => {
        router.push('/recommend/predict/1');
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
                                <div className={style.userName}>{item.name}</div>
                                <div className={style.tagsContainer}>
                                    {item.hotStreak > 2 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
                                            text={`${item.hotStreak}連紅`}
                                        />
                                    )}
                                    <Tag background="#4489FF" text={`月榜 ${item.ranking}`} />
                                </div>
                            </div>
                            <div className={style.unlockStatus}>
                                {item.unlock ? (
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
                        <div className={style.title}>{item.title}</div>
                        <div className={style.game} onClick={goDetail}>
                            <div className={style.detail}>
                                {item.cupName}
                                <span className={style.time}> | {item.cupTime}</span>
                            </div>
                            <div className={style.combination}>
                                {item.homeTeam} vs {item.awayTeam}
                            </div>
                        </div>
                        <div className={style.postTime}>发表于 {item.postTime}</div>
                    </div>
                );
            })}
        </>
    );
}

export default ArticleItem;
