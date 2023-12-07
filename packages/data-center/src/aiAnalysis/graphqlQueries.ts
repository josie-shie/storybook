export const GET_BIG_DATA_RECORD_LIST_QUERY = ``;

export const GET_ODDS_HINT_LIST_QUERY = `
    query getBigdataHint($input: HintInput!) {
        getBigdataHint(input: $input) {
            list {
                matchId
                matchTime
                countryId
                countryName
                leagueId
                leagueName
                homeId
                homeName
                awayId
                awayName
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
