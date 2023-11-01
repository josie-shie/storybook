'use client';
import type { GetDetailStatusResponse } from 'data-center';
import { creatSituationStore } from './situationStore';
import Handicap from './handicap';
import TotalGoals from './totalGoals';
import Event from './event';
import Technical from './technical';
import Lineup from './lineup';

function Situation({ situationData }: { situationData: GetDetailStatusResponse }) {
    creatSituationStore(situationData);
    return (
        <>
            <Handicap />
            <TotalGoals />
            <Event />
            <Technical />
            <Lineup />
        </>
    );
}

export default Situation;
