export const GET_FOOTBALL_STATS_RECORD_QUERY = `
    query getFootballStatsRecord($input:FootballStatsRecordInput!){
        getFootballStatsRecord(input: $input) {
            memberId
            ticketId
            handicapSide
            handicapValues
            overUnderValues
            startTime
            endTime
            analyTime
            isCompleted
        }
    }
`;

export const GET_ODDS_HINT_LIST_QUERY = `
    query getBigdataHint($input: HintInput!) {
        getBigdataHint(input: $input) {
            list {
                matchId
                startTime: matchTime 
                countryId
                countryCn: countryName
                leagueId
                leagueChsShort: leagueName 
                homeId
                homeChs: homeName 
                awayId
                awayChs: awayName 
                longOddsTeamId
                longOddsType
                longOddsTimes
                isFamous
                leagueLevel
            }
        }
    }
`;

export const GET_FOOTBALL_STATS_MATCHES_QUERY = `
    query getFootballStatsMatches($input: FootballStatsMatchInput){
        getFootballStatsMatches(input: $input) {
            matches {
                matchId
                leagueId
                leagueChs
                countryCn
                startTime
                homeChs
                awayChs
                homeScore
                homeHalfScore
                awayScore
                awayHalfScore
                isFamous
                leagueLevel
            }
        }
    }
`;

export const GET_FOOTBALL_STATS_RESULT_QUERY = `
    query getFootballStatsResult($input: FootballStatsResultInput!) {
        getFootballStatsResult(input: ($input) {
            memberId
            ticketId
            handicapSide
            handicapValues
            overUnderValues
            startTime
            endTime
            fullHandicapUpper
            fullHandicapLower
            fullHandicapDraw
            fullHandicapUpperDaily {
                date
                matches
            }
            fullHandicapLowerDaily {
                date
                matches
            }
            fullHandicapDrawDaily {
                date
                matches
            }
            halfHandicapUpper
            halfHandicapLower
            halfHandicapDraw
            halfHandicapUpperDaily {
                date
                matches
            }
            halfHandicapLowerDaily {
                date
                matches
            }
            halfHandicapDrawDaily {
                date
                matches
            }
            fullOverUnderOver
            fullOverUnderUnder
            fullOverUnderDraw
            fullOverUnderOverDaily {
                date
                matches
            }
            fullOverUnderUnderDaily {
                date
                matches
            }
            fullOverUnderDrawDaily {
                date
                matches
            }
            halfOverUnderOver
            halfOverUnderUnder
            halfOverUnderDraw
            halfOverUnderOverDaily {
                date
                matches
            }
            halfOverUnderUnderDaily {
                date
                matches
            }
            halfOverUnderDrawDaily {
                date
                matches
            }
            fullTimeHomeWin
            fullTimeDraw
            fullTimeAwayWin
            fullTimeHomeWinDaily {
                date
                matches
            }
            fullTimeDrawDaily {
                date
                matches
            }
            fullTimeAwayWinDaily {
                date
                matches
            }
            halfTimeHomeWin
            halfTimeDraw
            halfTimeAwayWin
            halfTimeHomeWinDaily {
                date
                matches
            }
            halfTimeDrawDaily {
                date
                matches
            }
            halfTimeAwayWinDaily {
                date
                matches
            }
            goalsIn15Mins {
                goalsOver
                goalsUnder
            }
            correctScores {
                score
                matches
            }
            goalsInterval0To1
            goalsInterval2To3
            goalsInterval4To6
            goalsInterval7Plus
            analyTime
        }
    }
`;
