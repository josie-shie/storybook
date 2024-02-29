'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getUnlockedPost } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useUserStore } from '@/store/userStore';
import NoData from '@/components/baseNoData/noData';
import ScrollTop from '@/components/scrollTop/scrollTop';
import backLeftArrowImg from '../img/backLeftArrow.png';
import ArticleItem from './components/articleItem/articleItem';
import style from './myAnalysis.module.scss';
import { useArticleStore } from './myAnalysisStore';
import SkeletonLayout from './components/skeleton/skeleton';

function MyAnalysis() {
    const router = useRouter();
    const scrollAnalysisRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const userInfo = useUserStore.use.userInfo();
    const articleList = useArticleStore.use.unLockPostList().articleList;
    const pagination = useArticleStore.use.unLockPostList().pagination;
    const setUnLockPostList = useArticleStore.use.setUnLockPostList();

    useEffect(() => {
        const getUnlockedPostList = async () => {
            setIsLoading(true);
            const res = await getUnlockedPost({
                memberId: userInfo.uid,
                pagination: {
                    currentPage: 1,
                    perPage: 20
                }
            });
            if (res.success) {
                setUnLockPostList({
                    articleList: articleList.concat(res.data.list),
                    pagination: {
                        pageCount: res.data.pagination.pageCount,
                        totalCount: res.data.pagination.totalCount
                    }
                });
            }
            setIsLoading(false);
        };

        if (userInfo.uid) {
            void getUnlockedPostList();
        }
    }, [userInfo]);

    const loadMoreList = () => {
        if (
            currentPage <= Math.round(articleList.length / 30) &&
            currentPage < pagination.totalCount
        ) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={style.main} ref={scrollAnalysisRef}>
                    <SkeletonLayout />
                </div>
            );
        }

        if (articleList.length > 0) {
            return (
                <div className={style.main} ref={scrollAnalysisRef}>
                    {articleList.map(item => (
                        <ArticleItem item={item} key={item.postId} />
                    ))}
                    {articleList.length < pagination.totalCount ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div className={style.listEnd}>
                            <p>已滑到底啰</p>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={style.main} ref={scrollAnalysisRef}>
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
                        <div className={style.text}>解锁纪录</div>
                    </div>
                </div>
            </div>
            {renderContent()}
            <ScrollTop hasFooter={false} scrollContainerRef={scrollAnalysisRef} />
        </>
    );
}

export default MyAnalysis;
