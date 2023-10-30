'use client';
import Handicap from './handicap';
import TotalGoals from './totalGoals';
import Event from './event';
import Technical from './technical';
import Lineup from './lineup';
import style from './situation.module.scss';
import type { DetailStatusData } from '@/types/detailStatus';

function Situation({ situationData }: { situationData: DetailStatusData }) {
    return (
        <div className={style.situation}>
            <Handicap handicapData={situationData.handicapsData} />
            <TotalGoals totalGoalsData={situationData.totalGoalsData} />
            <Event eventInfo={situationData.eventInfo} eventList={situationData.eventList} />
            <Technical technicalList={situationData.technical} />
            {situationData.lineupInfo.matchId !== 0 && (
                <Lineup lineList={situationData.lineupInfo} />
            )}
        </div>
    );
}

export default Situation;
