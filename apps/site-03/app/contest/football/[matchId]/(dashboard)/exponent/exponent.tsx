'use client';
import { creatExponentStore } from './exponentStore';
import ExponentTable from './exponentTable';

function Exponent() {
    creatExponentStore({
        exponentData: {
            half: {
                handicaps: [
                    {
                        matchId: 1,
                        companyId: 3,
                        companyName: 'Crow*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 0.9,
                        awayCurrentOdds: 0.8
                    },
                    {
                        matchId: 1,
                        companyId: 8,
                        companyName: '36*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 0.9,
                        awayCurrentOdds: 0.8
                    }
                ],
                contestResult: [
                    {
                        matchId: 1,
                        companyId: 3,
                        companyName: 'Crow*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 2,
                        awayCurrentOdds: 0.8
                    },
                    {
                        matchId: 1,
                        companyId: 8,
                        companyName: '36*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 2,
                        awayCurrentOdds: 0.85
                    }
                ],
                goalTotal: [
                    {
                        matchId: 1,
                        companyId: 3,
                        companyName: 'Crow*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 3,
                        awayCurrentOdds: 0.85
                    },
                    {
                        matchId: 1,
                        companyId: 8,
                        companyName: '36*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 3,
                        awayCurrentOdds: 0.85
                    }
                ]
            },
            full: {
                handicaps: [
                    {
                        matchId: 1,
                        companyId: 3,
                        companyName: 'Crow*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 1.0,
                        awayCurrentOdds: 0.8
                    },
                    {
                        matchId: 1,
                        companyId: 8,
                        companyName: '36*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 1.0,
                        awayCurrentOdds: 0.8
                    }
                ],
                contestResult: [
                    {
                        matchId: 1,
                        companyId: 3,
                        companyName: 'Crow*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 0.9,
                        awayCurrentOdds: 0.8
                    },
                    {
                        matchId: 1,
                        companyId: 8,
                        companyName: '36*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 0.85,
                        awayCurrentOdds: 0.85
                    }
                ],
                goalTotal: [
                    {
                        matchId: 1,
                        companyId: 3,
                        companyName: 'Crow*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 0.85,
                        awayCurrentOdds: 0.85
                    },
                    {
                        matchId: 1,
                        companyId: 8,
                        companyName: '36*',
                        initialHandicap: 0.85,
                        homeInitialOdds: 0.85,
                        awayInitialOdds: 0.85,
                        currentHandicap: 0.85,
                        homeCurrentOdds: 0.85,
                        awayCurrentOdds: 0.85
                    }
                ]
            }
        }
    });
    return <ExponentTable />;
}

export default Exponent;
