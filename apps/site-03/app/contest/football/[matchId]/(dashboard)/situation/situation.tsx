'use client';
import type {
    GetDetailStatusResponse,
    CompanyLiveDetailResponse,
    TechnicalInfo,
    EventInfo
} from 'data-center';
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

function Situation({
    situationData,
    companyLiveOddsDetail
}: {
    situationData: GetDetailStatusResponse;
    companyLiveOddsDetail: CompanyLiveDetailResponse;
}) {
    creatSituationStore({
        ...situationData,
        companyLiveOddsDetail
    });

    const updateTechnical = useSituationStore.use.setTechnical();
    const updateEvent = useSituationStore.use.setEvents();
    const matchDetail = useContestDetailStore.use.matchDetail();

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
                    eventList.push(event.time);

                    if (event.isHome) {
                        eventInfo.isHome[event.time] = {
                            ...event
                        };
                    } else {
                        eventInfo.isAway[event.time] = {
                            ...event
                        };
                    }
                }
                updateEvent({ eventList, eventInfo });
            }
        };
        mqttService.getTechnicList(syncTechnicalGlobalStore);
        mqttService.getEventList(syncEventGlobalStore);
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
