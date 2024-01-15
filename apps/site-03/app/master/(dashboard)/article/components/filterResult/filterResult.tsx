'use client';
import { useEffect, useState } from 'react';
import type { RecommendPost } from 'data-center';
import { getPostList } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useUserStore } from '@/store/userStore';
import { useArticleStore } from '../../articleStore';
import style from './filterResult.module.scss';
import ContestList from './contestList';
import ArticleList from './articleList';

type HashTableType = Record<number, RecommendPost[]>;

function FilterResult() {
    const [onMounted, setOnMounted] = useState(false);
    const userInfo = useUserStore.use.userInfo();
    const setFilterResult = useArticleStore.use.setFilterResult();
    const filterList = useArticleStore.use.filterList();
    const filterResultIsOpen = useArticleStore.use.filterResultIsOpen();
    const setFilterResultIsOpen = useArticleStore.use.setFilterResultIsOpen();

    const contestFormat = (postList: RecommendPost[]) => {
        const contestList: HashTableType = {};
        const matchList: number[] = [];
        for (const post of postList) {
            if (typeof contestList[post.matchId] === 'undefined') {
                contestList[post.matchId] = [];
                matchList.push(post.matchId);
            }

            contestList[post.matchId].push(post);
        }

        setFilterResult({ filterContestList: contestList, filterMatchList: matchList });
    };

    const fetchArticleList = async () => {
        const postFilter = [filterList.group];
        const filterId = filterList.selectedId;

        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 1,
            postFilter,
            filterId
        });

        if (res.success) {
            contestFormat(res.data.posts);
        }
    };

    useEffect(() => {
        setOnMounted(true);
    }, []);

    useEffect(() => {
        if (filterResultIsOpen) {
            void fetchArticleList();
        }
    }, [filterResultIsOpen]);

    const onClose = () => {
        setFilterResultIsOpen({ status: false });
    };
    const onOpen = () => {
        setFilterResultIsOpen({ status: true });
    };

    return (
        <>
            {onMounted ? (
                <BottomDrawer isOpen={filterResultIsOpen} onClose={onClose} onOpen={onOpen}>
                    <div className={style.filterResults}>
                        <ContestList />
                        <ArticleList />
                    </div>
                </BottomDrawer>
            ) : null}
        </>
    );
}

export default FilterResult;
