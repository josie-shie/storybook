'use client';

import { useEffect, useState } from 'react';
import { getPostList } from 'data-center';
import Image from 'next/image';
import { type RecommendPost } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useUserStore } from '@/store/userStore';
import NoData from '@/components/baseNoData/noData';
import ScrollTop from '@/components/scrollTop/scrollTop';
import style from './articleList.module.scss';
import { creatArticleStore } from './articleStore';
import ArticleCard from './components/articleCard/articleCard';
import SkeletonLayout from './components/skeleton/skeleton';
import banner from './img/banner.png';

function ArticleList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [articleList, setArticleList] = useState<RecommendPost[]>([]);

    const userInfo = useUserStore.use.userInfo();

    creatArticleStore({ filterIsOpen: false });

    const fetchData = async () => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            postFilter: ['all'],
            pagination: {
                currentPage: 1,
                perPage: 30
            }
        });

        if (!res.success) {
            return new Error();
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sortPosts = (a: RecommendPost, b: RecommendPost) => {
            const matchTimeA = new Date(a.matchTime) < today ? 0 : 1;
            const matchTimeB = new Date(b.matchTime) < today ? 0 : 1;
            if (matchTimeA !== matchTimeB) {
                return matchTimeA - matchTimeB;
            }

            const createdAtA = new Date(a.createdAt).getTime();
            const createdAtB = new Date(b.createdAt).getTime();
            if (createdAtA !== createdAtB) {
                return createdAtB - createdAtA;
            }

            const weekHitRateA = Number(a.tag.weekHitRateDisplay);
            const weekHitRateB = Number(b.tag.weekHitRateDisplay);
            return weekHitRateB - weekHitRateA;
        };

        const sortedPosts = res.data.posts.sort(sortPosts);

        const updatedArticleList = articleList.concat(sortedPosts);
        setArticleList(updatedArticleList);
        setTotalPage(res.data.pagination.pageCount);
        setIsNoData(res.data.pagination.totalCount === 0);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(articleList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid, currentPage]);

    return (
        <>
            <Image alt="banner" className={style.banner} height={60} src={banner} width={390} />
            <div className={style.recommendPredict}>
                {articleList.length === 0 && isNoData === null && <SkeletonLayout />}

                {articleList.length === 0 && isNoData ? (
                    <NoData text="暂无资料" />
                ) : (
                    <div className={style.list}>
                        {articleList.length !== 0 ? (
                            <ul className={style.article}>
                                {articleList.map(article => {
                                    return <ArticleCard article={article} key={article.id} />;
                                })}
                            </ul>
                        ) : null}
                        {currentPage < totalPage ? (
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
                )}
            </div>
            <ScrollTop />
        </>
    );
}

export default ArticleList;
