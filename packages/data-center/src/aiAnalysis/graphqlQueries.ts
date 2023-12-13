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

export const GET_AI_ANALYSIS_REPORT_QUERY = ``;

export const GET_AI_ANALYSIS_CONTEST_LIST_QUERY = ``;
