export const GET_ODDS_LOG_BY_MATCH_QUERY = `
    query getOddsLogByMatch($matchId: Int!) {
        soccerOddsLog {
            getOddsLogByMatch(input:{ matchId: $matchId }) {
                handicap {
                  companyId
                  companyName
                  initial {
                    handicap
                    homeOdds
                    awayOdds
                    closed
                  }
                  beforeMatch {
                    handicap
                    homeOdds
                    awayOdds
                    closed
                  }
                  live {
                    handicap
                    homeOdds
                    awayOdds
                    closed
                  }
                }
                overUnder {
                  companyId
                  companyName
                  initial {
                    line
                    overOdds
                    underOdds
                    closed
                  }
                  beforeMatch {
                    line
                    overOdds
                    underOdds
                    closed
                  }
                  live {
                    line
                    overOdds
                    underOdds
                    closed
                  }
                }
                winDrawLose {
                  companyId
                  companyName
                  initial {
                    draw
                    homeWin
                    awayWin
                    closed
                  }
                  beforeMatch {
                    draw
                    homeWin
                    awayWin
                    closed
                  }
                  live {
                    draw
                    homeWin
                    awayWin
                    closed
                  }
                }
                corners {
                  companyId
                  companyName
                  initial {
                    line
                    overOdds
                    underOdds
                    closed
                  }
                  beforeMatch {
                    line
                    overOdds
                    underOdds
                    closed
                  }
                  live {
                    line
                    overOdds
                    underOdds
                    closed
                  }
                }
            }
        }
    }
`;

export const GET_ODDS_LOG_BY_COMPANY_QUERY = `
    query getOddsLogByCompany($matchId: Int!, $companyId: Int!) {
        soccerOddsLog {
          getOddsLogByCompany(input:{ matchId: $matchId, companyId: $companyId }) {
              handicap {
                awayScore
                homeScore
                handicap
                homeOdds
                awayOdds
                closed
                state
                oddsChangeTime
              }
              overUnder {
                homeScore
                awayScore
                line
                overOdds
                underOdds
                closed
                state
                oddsChangeTime
              }
              winDrawLose {
                homeScore
                awayScore
                homeWin
                draw
                awayWin
                closed
                state
                oddsChangeTime
              }
              corners {
                homeScore
                awayScore
                line
                overOdds
                underOdds
                closed
                state
                oddsChangeTime
              }
            }
        }
    }
`;
