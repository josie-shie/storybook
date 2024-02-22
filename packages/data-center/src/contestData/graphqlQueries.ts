export const GET_MATCH_ID_QUERY = `
    query getSingleMatch ($input: SingleMatchInput!) {
        getSingleMatch(input: $input) {
            matchId
            homeId
            awayId
        } 
    }  
`;

export const GET_RECENT_BATTLE_MATCH_QUERY = `
    query getRecentBattleMatch($matchId:Int!,$homeAway:Int!,$leagueId:Int!,$dataCount:Int!) {
        soccerData {
        getRecentBattleMatch(
            input: { matchId: $matchId, homeAway: $homeAway, leagueId: $leagueId, dataCount: $dataCount }
            ) {
                list {
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
`; // 歷史交鋒

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

export const GET_RECENT_MATCH_SCHEDULE_QUERY = `
    query getRecentMatchSchedule($matchId:Int!) {
        soccerData {
            getRecentMatchSchedule(input: { matchId: $matchId }) {
                home {
                    matchId
                    leagueId
                    leagueEn
                    leagueChs
                    leagueCht
                    matchTime
                    status
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
                }
                away {
                    matchId
                    leagueId
                    leagueEn
                    leagueChs
                    leagueCht
                    matchTime
                    status
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
                }
            }
        }
    }
`; // 近期賽程

export const GET_HALF_FULL_WIN_COUNTS_QUERY = `
    query getHalfFullWinCounts($matchId:Int!,$homeAway:Int!,$leagueId:Int!,$dataCount:Int!) {
        soccerData {
            getHalfFullWinCounts(
              input: { matchId: $matchId, homeAway: $homeAway, leagueId: $leagueId, dataCount: $dataCount }
            ) {
                home {
                    homeField {
                        victoryVictory
                        victoryDraw
                        victoryDefeat
                        drawVictory
                        drawDraw
                        drawDefeat
                        defeatVictory
                        defeatDraw
                        defeatDefeat
                    }
                    awayField {
                        victoryVictory
                        victoryDraw
                        victoryDefeat
                        drawVictory
                        drawDraw
                        drawDefeat
                        defeatVictory
                        defeatDraw
                        defeatDefeat
                    }
                    allField {
                        victoryVictory
                        victoryDraw
                        victoryDefeat
                        drawVictory
                        drawDraw
                        drawDefeat
                        defeatVictory
                        defeatDraw
                        defeatDefeat
                    }
                }
                        
                away {
                    homeField {
                        victoryVictory
                        victoryDraw
                        victoryDefeat
                        drawVictory
                        drawDraw
                        drawDefeat
                        defeatVictory
                        defeatDraw
                        defeatDefeat
                    }
                    awayField {
                        victoryVictory
                        victoryDraw
                        victoryDefeat
                        drawVictory
                        drawDraw
                        drawDefeat
                        defeatVictory
                        defeatDraw
                        defeatDefeat
                    }
                    allField {
                        victoryVictory
                        victoryDraw
                        victoryDefeat
                        drawVictory
                        drawDraw
                        drawDefeat
                        defeatVictory
                        defeatDraw
                        defeatDefeat
                    }
                }
            }
        }
    }
`; // 半全場勝負
