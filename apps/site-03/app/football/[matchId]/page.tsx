import { getLiveText, getMatchDetail } from 'data-center';
import type { Metadata } from 'next';
import { timestampToString } from 'lib';
import TabContent from './tabContent';

export async function generateMetadata({
    params
}: {
    params: { matchId: number };
}): Promise<Metadata> {
    const contestDetail = await getMatchDetail(params.matchId);

    if (!contestDetail.success) {
        return {
            title: '赛事 | 智球网'
        };
    }

    const gameData = timestampToString(contestDetail.data.matchTime, 'YYYY-MM-DD');
    return {
        title: `${contestDetail.data.homeChs} VS. ${contestDetail.data.awayChs} | 智球网`,
        description: `${contestDetail.data.leagueChsShort}联赛，${gameData} ${contestDetail.data.homeChs}对战${contestDetail.data.awayChs}`
    };
}

async function Page({ params }: { params: { matchId: number } }) {
    const liveTextData = await getLiveText(params.matchId);

    if (!liveTextData.success) {
        return new Error();
    }
    return (
        <TabContent
            fetchInitData={{ textLive: liveTextData.data }}
            initStatus="liveEvent"
            matchId={params.matchId}
        />
    );
}

export default Page;
