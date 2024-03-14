'use client';
import {
    getMemberIndividualGuessMatches,
    type GetMemberIndividualGuessMatchesResponse
} from 'data-center';
import { useEffect, useState } from 'react';
import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/masterAvatar/[masterId]/info';
import style from '@/app/master/list/layout.module.scss';
import MasterAvatar from '@/app/master/masterAvatar/[masterId]/masterAvatar';
import { useLockBodyScroll } from '@/hooks/lockScroll';
import type { Tab, InitGuessData } from '@/app/master/masterAvatar/[masterId]/page';

function Layout({ params }: { params: { masterId: string } }) {
    useLockBodyScroll();
    const [initGuessData, setInitGuessData] = useState<InitGuessData>({} as InitGuessData);

    useEffect(() => {
        const fetchData = async () => {
            const tmpData: InitGuessData = {
                0: {} as GetMemberIndividualGuessMatchesResponse,
                1: {} as GetMemberIndividualGuessMatchesResponse,
                2: {} as GetMemberIndividualGuessMatchesResponse
            };
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

                    tmpData[value] = res.data;
                })
            );
            setInitGuessData(tmpData);
        };

        void fetchData();
    }, [params.masterId]);

    return (
        <div className={style.layout}>
            <Header title="专家聊球" />
            <div className={style.masterAvatarLayout}>
                <Info params={params} />
                {Object.hasOwnProperty.call(initGuessData, 0) && (
                    <MasterAvatar initGuessData={initGuessData} params={params} />
                )}
            </div>
        </div>
    );
}

export default Layout;
