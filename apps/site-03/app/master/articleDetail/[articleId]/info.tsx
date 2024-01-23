'use client';
import { unFollow, updateFollow } from 'data-center';
import { type GetPostDetailResponse } from 'data-center';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Fire from '@/app/img/fire.png';
import User from './img/user.svg';
import LockOpen from './img/lockOpen.svg';
import { useUserStore } from '@/store/userStore';
import style from './info.module.scss';

interface InfoProps {
    article: GetPostDetailResponse;
    setArticle: Dispatch<SetStateAction<GetPostDetailResponse>>;
}

function Info({ article, setArticle }: InfoProps) {
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    const router = useRouter();

    const onIsFocused = async (id: number, follow: boolean) => {
        if (!isLogin) {
            router.push(`/master/masterAvatar/${article.id}?status=analysis&auth=login?auth=login`);
            return;
        }
        const res = follow
            ? await unFollow({ followerId: userInfo.uid, followedId: id })
            : await updateFollow({ followerId: userInfo.uid, followedId: id });
        if (!res.success) {
            return new Error();
        }

        setArticle(prevData => ({
            ...prevData,
            followed: !prevData.followed
        }));
    };

    const goMasterPredict = (id: number) => {
        router.push(`/master/masterAvatar/${id}?status=analysis`);
    };

    return (
        <>
            <section className={style.info}>
                <div className={style.detail}>
                    <div
                        onClick={() => {
                            goMasterPredict(article.mentorId);
                        }}
                    >
                        <Avatar borderColor="#fff" size={54} src={article.mentorImage} />
                    </div>
                    <div className={style.content}>
                        <div className={style.top}>
                            <span className={style.name}>{article.mentorName}</span>
                        </div>
                        <div>
                            {/* <Tag
                                background="rgba(255, 255, 255, 0.30)"
                                borderColor="#6e94d4"
                                text={`总进球 ${article.tag.winMaxAccurateStreak}场`}
                            />
                            <Tag
                                background="rgba(255, 255, 255, 0.30)"
                                borderColor="#6e94d4"
                                text={`勝負 ${article.tag.winMaxAccurateStreak}场`}
                            /> */}
                            {article.tag.winMaxAccurateStreak > 0 && (
                                <Tag
                                    icon={<Image alt="fire" src={Fire} />}
                                    text={`${article.tag.winMaxAccurateStreak} 連紅`}
                                />
                            )}
                            {article.tag.quarterRanking > 0 && (
                                <TagSplit
                                    isBlueBg
                                    border={false}
                                    number={article.tag.quarterRanking}
                                    textBackground="rgba(255, 255, 255, 0.30)"
                                    textColor="#fff"
                                    text="季"
                                />
                            )}
                            {article.tag.monthRanking > 0 && (
                                <TagSplit
                                    isBlueBg
                                    border={false}
                                    number={article.tag.monthRanking}
                                    textBackground="rgba(255, 255, 255, 0.30)"
                                    textColor="#fff"
                                    text="月"
                                />
                            )}
                            {article.tag.weekRanking > 0 && (
                                <TagSplit
                                    isBlueBg
                                    border={false}
                                    number={article.tag.weekRanking}
                                    textBackground="rgba(255, 255, 255, 0.30)"
                                    textColor="#fff"
                                    text="周"
                                />
                            )}
                        </div>
                        <div className={style.bottom}>
                            {article.fansNumber > 0 && (
                                <span>
                                    <User />
                                    <span>粉丝</span>
                                    {article.fansNumber}{' '}
                                </span>
                            )}
                            {article.unlockNumber > 0 && (
                                <span>
                                    <LockOpen />
                                    <span>解锁</span>
                                    {article.unlockNumber}{' '}
                                </span>
                            )}
                            {/* <span><span>猜球胜率</span>48%</span> */}
                        </div>
                    </div>
                </div>
                <div
                    className={article.followed ? style.focused : style.focus}
                    onClick={() => {
                        void onIsFocused(article.mentorId, article.followed);
                    }}
                >
                    {article.followed ? '已关注' : '关注'}
                </div>
            </section>
            {/* <div className={style.radius} /> */}
        </>
    );
}

export default Info;
