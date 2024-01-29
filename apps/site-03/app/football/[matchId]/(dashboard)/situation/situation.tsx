'use client';
import type { GetDetailStatusResponse, TechnicalInfo } from 'data-center';
import type { OddsHashTable, OddsRunningHashTable } from 'lib';
import { mqttService } from 'lib';
import { useEffect } from 'react';
import { creatSituationStore, useSituationStore } from '../../situationStore';
import { useContestDetailStore } from '../../contestDetailStore';
import Handicap from './handicap';
import TotalGoals from './totalGoals';
import Event from './event';
import Technical from './technical';
import Lineup from './lineup';
import HandicapDrawer from './components/oddsDetailDrawer/oddsDetailDrawer';

interface TechnicalInfoData {
    matchId: number;
    technicStat: TechnicalInfo[];
}

function Situation({ situationData }: { situationData: GetDetailStatusResponse }) {
    creatSituationStore({
        ...situationData,
        liveOddsData: []
    });

    const updateTechnical = useSituationStore.use.setTechnical();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const setNotStartedOdds = useSituationStore.use.setNotStartedOdds();
    const setInprogressOdds = useSituationStore.use.setInprogressOdds();

    useEffect(() => {
        const syncTechnicalGlobalStore = (message: Partial<TechnicalInfoData>) => {
            if (message.matchId === matchDetail.matchId && message.technicStat) {
                updateTechnical({ technical: message.technicStat });
            }
        };

        const syncNotStartedOdds = (message: Partial<OddsHashTable>) => {
            if (message[matchDetail.matchId]) {
                setNotStartedOdds(message, matchDetail.matchId);
            }
        };

        const syncOddsRunning = (message: Partial<OddsRunningHashTable>) => {
            if (message[matchDetail.matchId]) {
                setInprogressOdds(message, matchDetail.matchId);
            }

            // console.log('syncOddsRunning', message);
        };

        const syncOddsRunningHalf = (message: Partial<OddsRunningHashTable>) => {
            if (message[matchDetail.matchId]) {
                setInprogressOdds(message, matchDetail.matchId);
            }

            // console.log('syncOddsRunningHalf', message);
        };

        mqttService.getTechnicList(syncTechnicalGlobalStore);

        mqttService.getOddsRunning(syncOddsRunning);
        mqttService.getOddsRunningHalf(syncOddsRunningHalf);
        mqttService.getOdds(syncNotStartedOdds);
    }, []);

    return (
        <>
            <Handicap />
            <TotalGoals />
            <Event />
            <Technical />
            <Lineup />
            <HandicapDrawer />
        </>
    );
}

export default Situation;
