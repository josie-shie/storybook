'use client';
import Image from 'next/image';
import { getLeagueOfPostList } from 'data-center';
import { useEffect } from 'react';
import ArticleList from './articleList';
import Banner from './img/banner.png';
import FilterButton from './components/filterButton/filterButton';
import Filter from './components/filter/filter';
import FilterResult from './components/filterResult/filterResult';
import style from './article.module.scss';
import { useArticleStore } from './articleStore';

function Article() {
    const setFilterInit = useArticleStore.use.setFilterInit();
    const setArticleList = useArticleStore.use.setArticleList();

    const fetchLeagueOfPostList = async () => {
        const res = await getLeagueOfPostList();

        if (res.success) {
            setFilterInit({ filterOriginList: res.data });
        }
    };

    useEffect(() => {
        void fetchLeagueOfPostList();

        return () => {
            setArticleList({ articleList: [] });
        };
    }, []);

    return (
        <>
            <Image alt="" className={style.banner} src={Banner} />
            <div className={style.toolbar}>
                <FilterButton />
            </div>
            <div className="recommendPredict">
                <ArticleList />
            </div>
            <Filter />
            <FilterResult />
        </>
    );
}

export default Article;
