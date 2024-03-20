'use client';
import { useEffect, useState } from 'react';
import {
    getMemberIndividualGuessMatches,
    type GetMemberIndividualGuessMatchesResponse
} from 'data-center';
import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/memberAvatar/[memberId]/info';
import MemberAvatar from '@/app/master/memberAvatar/[memberId]/memberAvatar';
import style from '@/app/master/masterAvatar/[masterId]/layout.module.scss';
import { useLockBodyScroll } from '@/hooks/lockScroll';
import type { Tab, InitGuessData } from '@/app/master/masterAvatar/[masterId]/page';

function Layout({ params }: { params: { memberId: string } }) {
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
                        memberId: Number(params.memberId),
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
    }, [params.memberId]);

    return (
        <div className={style.layout}>
            <Header title="其他会员" />
            <div className={style.masterAvatarLayout}>
                <Info params={params} />
                <MemberAvatar initGuessData={initGuessData} params={params} />
            </div>
        </div>
    );
}

export default Layout;
