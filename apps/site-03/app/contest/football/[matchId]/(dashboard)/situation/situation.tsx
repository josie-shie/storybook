'use client';
import type { GetDetailStatusResponse, CompanyLiveDetailResponse } from 'data-center';
import { creatSituationStore } from './situationStore';
import Handicap from './handicap';
import TotalGoals from './totalGoals';
import Event from './event';
import Technical from './technical';
import Lineup from './lineup';
import HandicapDrawer from './components/oddsDetailDrawer/oddsDetailDrawer';

function Situation({
    situationData,
    companyLiveOddsDetail
}: {
    situationData: GetDetailStatusResponse;
    companyLiveOddsDetail: CompanyLiveDetailResponse;
}) {
    creatSituationStore({
        ...situationData,
        companyLiveOddsDetail,

        setCompanyLiveOddsDetail: () => {
            // empty
        }
    });

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
