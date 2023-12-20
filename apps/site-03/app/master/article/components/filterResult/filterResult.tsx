'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { RecommendPost } from 'data-center';
import { getPostList } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useUserStore } from '@/app/userStore';
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
    const searchParams = useSearchParams();
    const isOpen = searchParams.get('filterResult');
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value?: string) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    );

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
        if (isOpen === 'open') {
            void fetchArticleList();
        }
    }, [isOpen]);

    const onClose = () => {
        router.push(`${pathname}?${createQueryString('filterResult')}`);
    };
    const onOpen = () => {
        router.push(`${pathname}?${createQueryString('filterResult', 'open')}`);
    };

    return (
        <>
            {onMounted ? (
                <BottomDrawer isOpen={isOpen === 'open'} onClose={onClose} onOpen={onOpen}>
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
