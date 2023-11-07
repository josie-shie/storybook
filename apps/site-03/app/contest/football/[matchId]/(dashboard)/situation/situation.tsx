'use client';
import type {
    GetDetailStatusResponse,
    CompanyLiveDetailResponse,
    TechnicalInfo
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

    const update = useSituationStore.use.setTechnical();
    const matchDetail = useContestDetailStore.use.matchDetail();

    useEffect(() => {
        const syncGlobalStore = (message: Partial<TechnicalInfoData>) => {
            if (message.matchId === matchDetail.matchId && message.technicStat) {
                update({ technical: message.technicStat });
            }
        };
        mqttService.getTechnicList(syncGlobalStore);
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
