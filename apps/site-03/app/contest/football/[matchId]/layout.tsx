import type { ReactNode } from 'react';
import './dataTable.scss';
import { getMatchDetail } from 'data-center';
import LiveBox from './liveBox';
import GuessBar from './guessBar';
import TabBar from './tabBar';

async function DetailLayout({
    children,
    params
}: {
    children: ReactNode;
    params: { matchId: number };
}) {
    const contestDetail = await getMatchDetail(params.matchId);

    if (!contestDetail.success) {
        return new Error();
    }
    return (
        <>
            <LiveBox
                backHistory={false}
                contestDetail={contestDetail.data}
                matchId={params.matchId}
            />
            <GuessBar />
            <TabBar matchId={params.matchId}>{children}</TabBar>
        </>
    );
}

export default DetailLayout;
