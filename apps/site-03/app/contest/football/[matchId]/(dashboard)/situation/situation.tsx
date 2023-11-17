'use client';
import type { GetDetailStatusResponse, TechnicalInfo, EventInfo } from 'data-center';
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

interface EventInfoData {
    matchId: number;
    event: EventInfo[];
}

interface OddChangType {
    match: {
        matchId: number;
        homeScore: number;
        awayScore: number;
        state: number;
    };
    handicapHalfList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        homeCurrentOdds: number;
        awayCurrentOdds: number;
        oddsChangeTime: number;
        oddsType: number;
    }[];
    handicapList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        homeCurrentOdds: number;
        awayCurrentOdds: number;
        isMaintained: boolean;
        isInProgress: boolean;
        oddsChangeTime: number;
        isClosed: boolean;
        oddsType: number;
    }[];
    overUnderHalfList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        oddsType: number;
    }[];
    overUnderList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        isClosed: boolean;
        oddsType: number;
    }[];
    europeOddsHalfList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        isClosed: boolean;
        oddsType: number;
    }[];
    europeOddsList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        oddsType: number;
    }[];
}

function Situation({ situationData }: { situationData: GetDetailStatusResponse }) {
    creatSituationStore({
        ...situationData,
        liveOddsData: []
    });

    const updateTechnical = useSituationStore.use.setTechnical();
    const updateEvent = useSituationStore.use.setEvents();
    const matchDetail = useContestDetailStore.use.matchDetail();
    const setOddChange = useSituationStore.use.setOddChange();
    const setOdds = useSituationStore.use.setOdds();

    useEffect(() => {
        const syncTechnicalGlobalStore = (message: Partial<TechnicalInfoData>) => {
            if (message.matchId === matchDetail.matchId && message.technicStat) {
                updateTechnical({ technical: message.technicStat });
            }
        };

        const syncEventGlobalStore = (message: Partial<EventInfoData>) => {
            if (message.matchId === matchDetail.matchId && message.event) {
                const eventList: string[] = [];
                const eventInfo = {
                    isAway: {},
                    isHome: {}
                };

                for (const event of message.event) {
                    const eventTime = `${event.time}${
                        event.overtime !== '0' ? `+${event.overtime}` : ''
                    }`;

                    if (!eventList.includes(eventTime)) {
                        eventList.push(eventTime);
                    }

                    if (event.isHome) {
                        eventInfo.isHome[eventTime] = {
                            ...event
                        };
                    } else {
                        eventInfo.isAway[eventTime] = {
                            ...event
                        };
                    }
                }
                updateEvent({ eventList, eventInfo });
            }
        };

        const syncOddChange = (message: OddChangType) => {
            if (message[matchDetail.matchId]) {
                setOddChange({ oddChangeData: message });
            }
        };

        const syncOdds = (message: Partial<OddsHashTable>) => {
            if (message[matchDetail.matchId]) {
                setOdds(message, matchDetail.matchId);
            }
        };

        const syncOddsRunning = (message: Partial<OddsRunningHashTable>) => {
            // eslint-disable-next-line no-console -- TODO
            console.log('syncOddsRunning', message);
        };

        const syncOddsRunningHalf = (message: Partial<OddsRunningHashTable>) => {
            // eslint-disable-next-line no-console -- TODO
            console.log('syncOddsRunningHalf', message);
        };

        mqttService.oddRunningInit();
        mqttService.getTechnicList(syncTechnicalGlobalStore);
        mqttService.getEventList(syncEventGlobalStore);
        mqttService.getOdds(syncOddChange);
        mqttService.getOdds(syncOdds);
        mqttService.getOddsRunning(syncOddsRunning);
        mqttService.getOddsRunningHalf(syncOddsRunningHalf);
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
