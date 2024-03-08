'use client';
import {
    getMemberIndividualGuessMatches,
    type GetMemberIndividualGuessMatchesResponse
} from 'data-center';
import { useEffect } from 'react';
import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/masterAvatar/[masterId]/info';
import style from '@/app/master/list/layout.module.scss';
import MasterAvatar from '@/app/master/masterAvatar/[masterId]/masterAvatar';
import { useLockBodyScroll } from '@/hooks/lockScroll';
import type { Tab, InitGuessData } from '@/app/master/masterAvatar/[masterId]/page';

function Layout({ params }: { params: { masterId: string } }) {
    useLockBodyScroll();
    const initGuessData: InitGuessData = {
        0: {} as GetMemberIndividualGuessMatchesResponse,
        1: {} as GetMemberIndividualGuessMatchesResponse,
        2: {} as GetMemberIndividualGuessMatchesResponse
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all(
                [0, 1, 2].map(async (value: Tab) => {
                    const res = await getMemberIndividualGuessMatches({
                        memberId: Number(params.masterId),
                        currentPage: 1,
                        pageSize: 50,
                        guessType: value
                    });

                    if (!res.success) {
                        throw new Error();
                    }
                    initGuessData[value] = res.data;
                })
            );
        };

        void fetchData();
    }, [params.masterId]);

    return (
        <div className={style.layout}>
            <Header title="专家聊球" />
            <div className={style.masterAvatarLayout}>
                <Info params={params} />
                <MasterAvatar initGuessData={initGuessData} params={params} />
            </div>
        </div>
    );
}

export default Layout;
