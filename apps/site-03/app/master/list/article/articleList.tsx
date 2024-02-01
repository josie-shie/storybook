'use client';

import { useEffect, useState } from 'react';
import { getPostList } from 'data-center';
import Image from 'next/image';
import { type PostFilter, type RecommendPost } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useUserStore } from '@/store/userStore';
import NoData from '@/components/baseNoData/noData';
import style from './articleList.module.scss';
import { creatArticleStore } from './articleStore';
import ArticleCard from './components/articleCard/articleCard';
import SkeletonLayout from './components/skeleton/skeleton';
import banner from './img/banner.png';

function ArticleList() {
    const [isActive, setIsActive] = useState<PostFilter[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [articleList, setArticleList] = useState<RecommendPost[]>([]);

    const userInfo = useUserStore.use.userInfo();

    creatArticleStore({ filterIsOpen: false });

    const updateActive = (value: PostFilter) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });

        setArticleList([]);
        setCurrentPage(1);
    };

    const fetchData = async () => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            postFilter: isActive.length === 0 ? ['all'] : isActive,
            pagination: {
                currentPage: 1,
                perPage: 30
            }
        });

        if (!res.success) {
            return new Error();
        }
        const updatedArticleList = [...articleList, ...res.data.posts];
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
    }, [userInfo.uid, currentPage, isActive]);

    return (
        <>
            <Image alt="banner" src={banner} className={style.banner} width={390} height={60} />
            <div className={style.recommendPredict}>
                {articleList.length === 0 && isNoData === null && <SkeletonLayout />}

                {articleList.length === 0 && isNoData ? (
                    <NoData text="暂无资料" />
                ) : (
                    <ul className={style.article}>
                        {articleList.map(article => {
                            return <ArticleCard article={article} key={article.id} />;
                        })}
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
                    </ul>
                )}
            </div>
        </>
    );
}

export default ArticleList;
