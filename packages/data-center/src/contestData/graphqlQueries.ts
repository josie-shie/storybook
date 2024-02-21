export const GET_MATCH_ID_QUERY = `
    query getSingleMatch ($input: SingleMatchInput!) {
        getSingleMatch(input: $input) {
            matchId
            homeId
            awayId
        } 
    }  
`;

export const GET_RECENT_MATCH_QUERY = `
    query getRecentMatch($matchId:Int!,$homeAway:Int!,$leagueId:Int!,$dataCount:Int!) {
        soccerData {
            getRecentMatch(
              input: { matchId: $matchId, homeAway: $homeAway, leagueId: $leagueId, dataCount: $dataCount }
            ) {
                home {
                    matchId
                    leagueId
                    leagueEn
                    leagueChs
                    leagueCht
                    matchTime
                    homeEn
                    homeChs
                    homeCht
                    awayEn
                    awayChs
                    awayCht
                    homeId
                    awayId
                    homeScore
                    awayScore
                    homeHalfScore
                    awayHalfScore
                    homeRed
                    awayRed
                    homeCorner
                    awayCorner
                    handicapCurrent
                    handicapHomeCurrentOdds
                    handicapAwayCurrentOdds
                    overUnderCurrent
                    overUnderOverCurrentOdds
                    overUnderUnderCurrentOdds
                    status
                    hasAnimation
                    leagueLevel
                }
              
                away {
                    matchId
                    leagueId
                    leagueEn
                    leagueChs
                    leagueCht
                    matchTime
                    homeEn
                    homeChs
                    homeCht
                    awayEn
                    awayChs
                    awayCht
                    homeId
                    awayId
                    homeScore
                    awayScore
                    homeHalfScore
                    awayHalfScore
                    homeRed
                    awayRed
                    homeCorner
                    awayCorner
                    handicapCurrent
                    handicapHomeCurrentOdds
                    handicapAwayCurrentOdds
                    overUnderCurrent
                    overUnderOverCurrentOdds
                    overUnderUnderCurrentOdds
                    status
                    hasAnimation
                    leagueLevel
                }
            }
          }
    }
`; // 近期战绩
