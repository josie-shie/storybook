'use client';

import Event from './event';
import Technical from './technical';
import Lineup from './lineup';
import type { DetailStatusData } from '@/types/detailStatus';

function Situation({ situationData }: { situationData: DetailStatusData }) {
    return (
        <>
            <Event eventInfo={situationData.eventInfo} eventList={situationData.eventList} />
            <Technical technicalList={situationData.technical} />
            {situationData.lineupInfo.matchId !== 0 && (
                <Lineup lineList={situationData.lineupInfo} />
            )}
        </>
    );
}

export default Situation;
