export const GET_BIG_DATA_RECORD_LIST_QUERY = ``;

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
