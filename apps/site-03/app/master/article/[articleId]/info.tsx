'use client';
import { unFollow, updateFollow } from 'data-center';
import { type GetPostDetailResponse } from 'data-center';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import Fire from '@/app/img/fire.png';
import { useUserStore } from '../../../userStore';
import style from './info.module.scss';

interface InfoProps {
    article: GetPostDetailResponse;
    setArticle: Dispatch<SetStateAction<GetPostDetailResponse>>;
}

function Info({ article, setArticle }: InfoProps) {
    const userInfo = useUserStore.use.userInfo();

    const router = useRouter();

    const onIsFocused = async (id: number, follow: boolean) => {
        const isCookieExist = Cookies.get('access');
        if (!isCookieExist) {
            router.push('/master/expert/?auth=login');
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
                        {article.tag.winMaxAccurateStreak > 0 && (
                            <Tag
                                icon={<Image alt="fire" src={Fire} />}
                                text={`${article.tag.winMaxAccurateStreak} 連紅`}
                            />
                        )}

                        {article.tag.quarterRanking > 0 && (
                            <Tag
                                background="#fff"
                                color="#4489ff"
                                text={`季榜 ${article.tag.quarterRanking}`}
                            />
                        )}
                        {article.tag.monthRanking > 0 && (
                            <Tag
                                background="#fff"
                                color="#4489ff"
                                text={`月榜 ${article.tag.monthRanking}`}
                            />
                        )}
                        {article.tag.weekRanking > 0 && (
                            <Tag
                                background="#fff"
                                color="#4489ff"
                                text={`周榜 ${article.tag.weekRanking}`}
                            />
                        )}
                    </div>
                    <div className={style.bottom}>
                        {article.fansNumber > 0 && <span>粉絲: {article.fansNumber} </span>}
                        {article.unlockNumber > 0 && <span>解鎖: {article.unlockNumber} </span>}
                        {article.tag.quarterHitRate > 0 && (
                            <span>
                                近一季猜球胜率: {Math.round(article.tag.quarterHitRate * 100)}%
                            </span>
                        )}
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
    );
}

export default Info;
