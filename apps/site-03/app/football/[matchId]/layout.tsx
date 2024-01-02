import type { ReactNode } from 'react';
import './dataTable.scss';
import { getMatchDetail } from 'data-center';
import LiveBox from './liveBox';
import GuessBar from './guessBar';
import OddMqttService from './oddMqttService';

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
            {children}
            <OddMqttService />
        </>
    );
}

export default DetailLayout;
