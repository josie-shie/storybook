'use client';
// import InfoDrawer from './(infoDrawer)/infoDrawer';
import GameEvent from './gameEvent';
// import Handicap from './handicap';
// import TotalGoals from './totalGoals';
import Technical from './technical';
import Lineup from './lineup';
import type { DetailStatusData } from '@/types/detailStatus';

function Situation({ situationData }: { situationData: DetailStatusData }) {
    return (
        <>
            {/* <Handicap
                handicapData={situationData.handicapsData}
                openInfoStatus={openInfoStatus}
                resetSwiperHight={resetSwiperHight}
            />
            <TotalGoals
                openInfoStatus={openInfoStatus}
                totalGoalsData={situationData.totalGoalsData}
            /> */}
            <GameEvent eventInfo={situationData.eventInfo} eventList={situationData.eventList} />

            <Technical technicalList={situationData.technical} />
            {situationData.lineupInfo.matchId !== 0 && (
                <Lineup lineList={situationData.lineupInfo} />
            )}

            {/* <InfoDrawer infoData={infoData} infoStatus={infoStatus} setInfoStatus={setInfoStatus} /> */}
        </>
    );
}

export default Situation;
