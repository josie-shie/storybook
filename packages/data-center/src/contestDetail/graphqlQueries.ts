export const GET_SINGLE_MATCH_QUERY = `
    query getSingleMatch ($input: SingleMatchInput!) {
        getSingleMatch(input: $input) {
            matchId
            color
            kind
            leagueId
            leagueEn
            leagueEnShort
            leagueChsShort
            leagueChtShort
            subLeagueId
            subLeagueEn
            subLeagueChs
            subLeagueCht
            matchTime
            startTime
            halfStartTime
            homeEn
            homeChs
            homeCht
            awayEn
            awayChs
            awayCht
            homeId
            awayId
            state
            homeScore
            awayScore
            homeHalfScore
            awayHalfScore
            homeRed
            awayRed
            homeYellow
            awayYellow
            homeCorner
            awayCorner
            homeRankEn
            homeRankCn
            awayRankEn
            awayRankCn
            isNeutral
            hasLineup
            season
            groupId
            roundEn
            roundCn
            grouping
            locationEn
            locationCn
            weatherEn
            weatherCn
            temp
            explainEn
            explainCn
            extraExplain
            isHidden
            injuryTime
            updateTime
            homeLogo
            awayLogo
            countryCn
            handicapClosed
            handicapCurrent
            handicapHomeCurrentOdds
            handicapAwayCurrentOdds
            overUnderClosed
            overUnderCurrent
            overUnderOverCurrentOdds
            overUnderUnderCurrentOdds
            status
            hasAnimation
            leagueLevel
        } 
    }  
`;

export const GET_ODDS_RUNNING_QUERY = `
    query getOddsRunning($input: OddsRunningRequest!) {
        getOddsRunning(input:$input) {
            companyId
            oddsRunning {
                matchId
                runningTime
                homeScore
                awayScore
                playType
                companyId
                isClosed
                handicap
                homeOrOverOdds
                awayOrUnderOdds
                evenOdds
                oddsChangeTime
            }
            oddsPrematch {
                matchId
                runningTime
                homeScore
                awayScore
                playType
                companyId
                isClosed
                handicap
                homeOrOverOdds
                awayOrUnderOdds
                evenOdds
                oddsChangeTime
            }
        }
    }
`;

export const GET_TEXT_LIVE_QUERY = `
    query getTextLive($matchId: Int!) {
        soccerLive {
            getTextLive(input:{ matchId: $matchId }) {
                textLive
            }
        }
    }
`;

export const GET_EVENT_DATA_QUERY = `
    query getEventData($matchId: Int!) {
        soccerLive {
            getEventData(input:{ matchId: $matchId }) {
                eventData {
                    id
                    matchId
                    isHome
                    kind
                    kindName
                    time
                    second
                    overTime
                    playerId
                    nameChs:playerChs
                    playerId2:playerOffOrAssistId
                    nameChs2:playerOffOrAssistChs
                  }
            }
        }
    }
`;

export const GET_INTELLIGENCE_QUERY = `
    query getIntelligence($matchId: Int!) {
        news {
            getIntelligence(input:{ matchId: $matchId }) {
                bad {
                    home {
                      content
                      importance
                    }
                    away{
                      content
                      importance
                    }
                }
                good {
                    home {
                      content
                      importance
                    }
                    away{
                      content
                      importance
                    }
                }
                neutral {
                    content
                    importance
                }
            }
        }
    }
`;
