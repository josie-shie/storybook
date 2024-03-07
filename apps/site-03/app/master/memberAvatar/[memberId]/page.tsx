import type { Metadata } from 'next';
import {
    getMemberIndividualGuessMatches,
    type GetMemberIndividualGuessMatchesResponse
} from 'data-center';
import MemberAvatar from './memberAvatar';

export const metadata: Metadata = {
    title: '会员个人 | FutureSport'
};

export type Tab = 0 | 1 | 2;

export interface InitGuessData {
    0: GetMemberIndividualGuessMatchesResponse;
    1: GetMemberIndividualGuessMatchesResponse;
    2: GetMemberIndividualGuessMatchesResponse;
}

async function Page({ params }: { params: { memberId: string } }) {
    const initGuessData: InitGuessData = {
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
            initGuessData[value] = res.data;
        })
    );
    return <MemberAvatar initGuessData={initGuessData} params={params} />;
}

export default Page;
