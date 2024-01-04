'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUnlockedPost } from 'data-center';
import { useUserStore } from '@/app/userStore';
import NoData from '@/components/baseNoData/noData';
import Loading from '@/components/loading/loading';
import backLeftArrowImg from '../img/backLeftArrow.png';
import ArticleItem from './components/articleItem/articleItem';
import style from './myAnalysis.module.scss';
import { useArticleStore } from './myAnalysisStore';

function MyAnalysis() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = useUserStore.use.userInfo();
    const articleList = useArticleStore.use.articleList();
    const setArticleList = useArticleStore.use.setArticleList();

    useEffect(() => {
        const getUnlockedPostList = async () => {
            setIsLoading(true);
            const res = await getUnlockedPost({ memberId: userInfo.uid });
            if (res.success) {
                setArticleList(res.data);
            }
            setIsLoading(false);
        };

        if (userInfo.uid) {
            void getUnlockedPostList();
        }
    }, [userInfo]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={style.main}>
                    <Loading />
                </div>
            );
        }

        if (articleList.length > 0) {
            return (
                <div className={style.main}>
                    {articleList.map(item => (
                        <ArticleItem item={item} key={item.postId} />
                    ))}
                </div>
            );
        }

        return (
            <div className={style.main}>
                <NoData text="暂无资料" />
            </div>
        );
    };

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.push('/userInfo');
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的解锁</div>
                    </div>
                </div>
            </div>
            {renderContent()}
        </>
    );
}

export default MyAnalysis;
