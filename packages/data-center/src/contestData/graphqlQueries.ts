export const GET_MATCH_ID_QUERY = `
    query getSingleMatch ($input: SingleMatchInput!) {
        getSingleMatch(input: $input) {
            matchId
            homeId
            awayId
        } 
    }  
`;

export const GET_LEAGUE_STANDINGS_QUERY = `
    query getLeagueStandings($input: GetLeagueStandingsInput!) {
      getLeagueStandings(request: $input) {
        homeTeamStandings {
          teamId
          totalCount
          winCount
          drawCount
          loseCount
          getScore
          loseScore
          goalDifference
          integral
          rank
          winRate
          homeTotalCount
          homeWinCount
          homeDrawCount
          homeLoseCount
          homeGetScore
          homeLoseScore
          homeGoalDifference
          homeIntegral
          homeRank
          homeWinRate
          awayTotalCount
          awayWinCount
          awayDrawCount
          awayLoseCount
          awayGetScore
          awayLoseScore
          awayGoalDifference
          awayIntegral
          awayRank
          awayWinRate
          recentTotalCount
          recentWinCount
          recentDrawCount
          recentLoseCount
          recentGetScore
          recentLoseScore
          recentGoalDifference
          recentIntegral
          recentWinRate
          teamName
        }
        awayTeamStandings {
          teamId
          totalCount
          winCount
          drawCount
          loseCount
          getScore
          loseScore
          goalDifference
          integral
          rank
          winRate
          homeTotalCount
          homeWinCount
          homeDrawCount
          homeLoseCount
          homeGetScore
          homeLoseScore
          homeGoalDifference
          homeIntegral
          homeRank
          homeWinRate
          awayTotalCount
          awayWinCount
          awayDrawCount
          awayLoseCount
          awayGetScore
          awayLoseScore
          awayGoalDifference
          awayIntegral
          awayRank
          awayWinRate
          recentTotalCount
          recentWinCount
          recentDrawCount
          recentLoseCount
          recentGetScore
          recentLoseScore
          recentGoalDifference
          recentIntegral
          recentWinRate
          teamName
        }
      }    
    }
`; // 積分排名

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
                    handicapInit
                    handicapHalfInit
                    handicapCurrent
                    handicapHomeCurrentOdds
                    handicapAwayCurrentOdds
                    overUnderInit
                    overUnderHalfInit
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
`; // 詳情 - 歷史交鋒

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
                    handicapInit
                    handicapHalfInit
                    handicapCurrent
                    handicapHomeCurrentOdds
                    handicapAwayCurrentOdds
                    overUnderInit
                    overUnderHalfInit
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
                    handicapInit
                    handicapHalfInit
                    handicapCurrent
                    handicapHomeCurrentOdds
                    handicapAwayCurrentOdds
                    overUnderInit
                    overUnderHalfInit
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
`; // 詳情 - 近期战绩

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
`; // 詳情 - 近期賽程

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
`; // 詳情 - 半全場勝負

export const GET_RECENT_MATCH_COMPARE_QUERY = `
    query getRecentMatchCompare($matchId:Int!,$homeAway:Int!,$leagueId:Int!,$dataCount:Int!) {
        soccerData {
            getRecentMatchCompare(
                input: { matchId: $matchId, homeAway: $homeAway, leagueId: $leagueId, dataCount: $dataCount }
            ) {
                home {
                    matchCount
                    handicapWinRate
                    overUnderWinRate
                    handicapWin
                    handicapLose
                    handicapDraw
                    overUnderWin
                    overUnderLose
                    overUnderDraw
                    handicapTrend
                    overUnderTrend
                    matchTrend
                    winRate
                    goal
                    goalAgainst
                }
                away {
                    matchCount
                    handicapWinRate
                    overUnderWinRate
                    handicapWin
                    handicapLose
                    handicapDraw
                    overUnderWin
                    overUnderLose
                    overUnderDraw
                    handicapTrend
                    overUnderTrend
                    matchTrend
                    winRate
                    goal
                    goalAgainst
                }
            }
        }
    }
`; // 對比 - 近期战绩

export const GET_BATTLE_MATCH_COMPARE_QUERY = `
    query getBattleMatchCompare($matchId:Int!,$homeAway:Int!,$leagueId:Int!,$dataCount:Int!) {
        soccerData {
            getBattleMatchCompare(
                input: { matchId: $matchId, homeAway: $homeAway, leagueId: $leagueId, dataCount: $dataCount }
            ) {
                matchCount
                handicapWinRate
                overUnderWinRate
                handicapWin
                handicapLose
                handicapDraw
                overUnderWin
                overUnderLose
                overUnderDraw
                handicapTrend
                overUnderTrend
                homeCompare {
                    id
                    winRate
                    win
                    draw
                    lose
                    goal
                    goalAgainst
                }
                awayCompare {
                    id
                    winRate
                    win
                    draw
                    lose
                    goal
                    goalAgainst
                }
            }
        }
    }
`; // 對比 - 歷史交鋒
