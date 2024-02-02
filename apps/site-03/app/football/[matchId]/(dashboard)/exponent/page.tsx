// import { getExponent } from 'data-center';
import type { GetExponentResponse } from 'data-center';
import TabContent from '../../tabContent';

const exponentMock = {
    companyList: {
        handicap: [3, 5],
        overUnder: [3, 7],
        winDrawLose: [3, 8],
        corners: [3, 10]
    },
    companyInfo: {
        handicap: {
            3: {
                companyName: 'Crown',
                initial: {
                    handicap: -0.5,
                    homeOdds: 1.9,
                    awayOdds: 1.9,
                    closed: false
                },
                beforeMatch: {
                    handicap: -0.5,
                    homeOdds: 1.95,
                    awayOdds: 1.85,
                    closed: false
                },
                live: {
                    handicap: -0.75,
                    homeOdds: 1.8,
                    awayOdds: 2.0,
                    closed: false
                }
            },
            5: {
                companyName: 'Bet365',
                initial: {
                    handicap: -1,
                    homeOdds: 2.0,
                    awayOdds: 1.8,
                    closed: false
                },
                beforeMatch: {
                    handicap: 1.5,
                    homeOdds: 2.05,
                    awayOdds: 1.75,
                    closed: false
                },
                live: {
                    handicap: -1.25,
                    homeOdds: 1.85,
                    awayOdds: 1.95,
                    closed: false
                }
            }
        },
        overUnder: {
            3: {
                companyName: 'Crown',
                initial: {
                    line: 2.5,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                beforeMatch: {
                    line: 3,
                    overOdds: 1.95,
                    underOdds: 1.85,
                    closed: false
                },
                live: {
                    line: 2.75,
                    overOdds: 1.85,
                    underOdds: 1.95,
                    closed: false
                }
            },
            7: {
                companyName: 'Unibet',
                initial: {
                    line: 3,
                    overOdds: 2.0,
                    underOdds: 1.8,
                    closed: false
                },
                beforeMatch: {
                    line: 3.25,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                live: {
                    line: 3.25,
                    overOdds: 1.8,
                    underOdds: 2.0,
                    closed: false
                }
            }
        },
        winDrawLose: {
            3: {
                companyName: 'Crown',
                initial: {
                    homeWin: 2.3,
                    draw: 3.2,
                    awayWin: 3.0,
                    closed: false
                },
                beforeMatch: {
                    homeWin: 2.2,
                    draw: 3.1,
                    awayWin: 3.1,
                    closed: false
                },
                live: {
                    homeWin: 2.1,
                    draw: 3.3,
                    awayWin: 3.2,
                    closed: false
                }
            },
            8: {
                companyName: 'Pinnacle',
                initial: {
                    homeWin: 2.4,
                    draw: 3.1,
                    awayWin: 2.9,
                    closed: false
                },
                beforeMatch: {
                    homeWin: 2.25,
                    draw: 3.15,
                    awayWin: 3.05,
                    closed: false
                },
                live: {
                    homeWin: 2.05,
                    draw: 3.25,
                    awayWin: 3.15,
                    closed: false
                }
            }
        },
        corners: {
            3: {
                companyName: 'Crown',
                initial: {
                    line: 9.5,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                beforeMatch: {
                    line: 10,
                    overOdds: 1.85,
                    underOdds: 1.95,
                    closed: false
                },
                live: {
                    line: 10.5,
                    overOdds: 1.8,
                    underOdds: 2.0,
                    closed: false
                }
            },
            10: {
                companyName: 'William Hill',
                initial: {
                    line: 8.5,
                    overOdds: 1.95,
                    underOdds: 1.85,
                    closed: false
                },
                beforeMatch: {
                    line: 9,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                live: {
                    line: 9.5,
                    overOdds: 1.85,
                    underOdds: 1.95,
                    closed: false
                }
            }
        }
    }
} as GetExponentResponse;

function Page({ params }: { params: { matchId: number } }) {
    // const exponentData = await getExponent(params.matchId, 0);

    // if (!exponentData.success) {
    //     return new Error();
    // }

    return (
        <TabContent
            fetchInitData={{ exponent: exponentMock }}
            initStatus="exponent"
            matchId={params.matchId}
        />
    );
}

export default Page;
