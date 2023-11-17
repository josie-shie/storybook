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
        } 
    }  
`;

export const GET_DETAIL_STATUS_QUERY = `
    query getDetailStatus($input: DetailStatusInput!){
        getDetailStatus(input: $input) {
            handicapsFull {
            company{
                id
                timePeriods{
                notStarted {
                    matchId
                    companyId
                    initialHandicap
                    homeInitialOdds
                    awayInitialOdds
                    currentHandicap
                    homeCurrentOdds
                    awayCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                inProgress {
                    matchId
                    companyId
                    initialHandicap
                    homeInitialOdds
                    awayInitialOdds
                    currentHandicap
                    homeCurrentOdds
                    awayCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                }
            }
            }
            handicapsHalf {
            company{
                id
                timePeriods{
                notStarted {
                    matchId
                    companyId
                    initialHandicap
                    homeInitialOdds
                    awayInitialOdds
                    currentHandicap
                    homeCurrentOdds
                    awayCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                inProgress {
                    matchId
                    companyId
                    initialHandicap
                    homeInitialOdds
                    awayInitialOdds
                    currentHandicap
                    homeCurrentOdds
                    awayCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                }
            }
            }
            totalGoalsFull {
            company{
                id
                timePeriods{
                notStarted {
                    matchId
                    companyId
                    initialHandicap
                    overInitialOdds
                    underInitialOdds
                    currentHandicap
                    overCurrentOdds
                    underCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                inProgress {
                    matchId
                    companyId
                    initialHandicap
                    overInitialOdds
                    underInitialOdds
                    currentHandicap
                    overCurrentOdds
                    underCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                }
            }
            }
            totalGoalsHalf {
            company{
                id
                timePeriods{
                notStarted {
                    matchId
                    companyId
                    initialHandicap
                    overInitialOdds
                    underInitialOdds
                    currentHandicap
                    overCurrentOdds
                    underCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                inProgress {
                    matchId
                    companyId
                    initialHandicap
                    overInitialOdds
                    underInitialOdds
                    currentHandicap
                    overCurrentOdds
                    underCurrentOdds
                    oddsChangeTime
                    oddsType
                    state
                    homeScore
                    awayScore
                    isClosed
                }
                }
            }
            }
            events {
            id
            isHome
            kind
            time
            nameEn
            nameChs
            nameCht
            playerId
            playerId2
            overtime
            }
            liveText {
            id
            content
            time
            }
            technicalStatistics {
            technicType
            home
            away
            }
            lineupInfo {
            matchId
            homeArray
            awayArray
            homeLineup {
                playerId
                nameEn
                nameChs
                nameCht
                number
                positionId
            }
            awayLineup {
                playerId
                nameEn
                nameChs
                nameCht
                number
                positionId
            }
            homeBackup {
                playerId
                nameEn
                nameChs
                nameCht
                number
                positionId
            }
            awayBackup {
                playerId
                nameEn
                nameChs
                nameCht
                number
                positionId
            }
            }
        }
    }
`;

export const GET_LIVE_TEXT_QUERY = `
    query getDetailStatus($input: DetailStatusInput!) {
        getDetailStatus(input: $input) {
            liveText {
                id
                content
                time
            }
        }
    },
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
        }
    }
`;
