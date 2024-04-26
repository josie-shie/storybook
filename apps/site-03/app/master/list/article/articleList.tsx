'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { BannerInfo, RecommendPost } from 'data-center';
import { getBannerList, getPostList } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useUserStore } from '@/store/userStore';
import NoData from '@/components/baseNoData/noData';
import ScrollTop from '@/components/scrollTop/scrollTop';
import BaseBanner from '@/components/baseBanner/baseBanner';
import style from './articleList.module.scss';
import { creatArticleStore } from './articleStore';
import ArticleCard from './components/articleCard/articleCard';
import SkeletonLayout from './components/skeleton/skeleton';
import banner from './img/banner.png';

function ArticleList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ pageCount: 1, totalCount: 1 });
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [articleList, setArticleList] = useState<RecommendPost[]>([]);
    const [bannerList, setBannerList] = useState<BannerInfo[]>([]);

    const userInfo = useUserStore.use.userInfo();

    creatArticleStore({ filterIsOpen: false });

    const fetchData = async ({ page }: { page: number }) => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            postFilter: ['all'],
            pagination: {
                currentPage: page,
                perPage: 20
            }
        });

        if (!res.success) {
            return new Error();
        }

        if (!res.data.posts.length) {
            setIsNoData(true);
            setArticleList([]);
            setPagination(res.data.pagination);
            return;
        }
        const updatedArticleList = articleList.concat(res.data.posts);
        setArticleList(updatedArticleList);
        setPagination(res.data.pagination);
        setIsNoData(false);
    };

    const fetchBannerList = async () => {
        const res = await getBannerList({ location: 'SOCCERANALYSIS' });
        if (!res.success) {
            return new Error();
        }
        setBannerList(res.data.banners);
    };

    const loadMoreList = () => {
        if (
            currentPage <= Math.round(articleList.length / 20) &&
            currentPage < pagination.totalCount
        ) {
            setCurrentPage(prevData => prevData + 1);
            void fetchData({ page: currentPage + 1 });
        }
    };

    useEffect(() => {
        void fetchData({ page: 1 });
        void fetchBannerList();
    }, [userInfo.uid]);

    const renderContent = () => {
        if (articleList.length === 0 && isNoData === null) {
            return (
                <div className={style.recommendPredict}>
                    <SkeletonLayout />
                </div>
            );
        }

        if (articleList.length > 0) {
            return (
                <div className={style.recommendPredict}>
                    <ul className={style.article}>
                        {articleList.map(article => (
                            <ArticleCard article={article} key={article.id} />
                        ))}
                    </ul>
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
            <div className={style.recommendPredict}>
                <NoData text="暂无资料" />
            </div>
        );
    };

    return (
        <>
            {bannerList.length ? (
                <BaseBanner bannerList={bannerList} className={style.banner} />
            ) : (
                <Image
                    alt="banner"
                    className={style.defaultBanner}
                    height={60}
                    src={banner}
                    width={390}
                />
            )}
            {renderContent()}
            <ScrollTop />
        </>
    );
}

export default ArticleList;
