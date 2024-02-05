export const GET_ODDS_LOG_BY_MATCH_QUERY = `
    query getOddsLogByMatch($matchId: Int!) {
        soccerOddsLog {
            getOddsLogByMatch(input:{ matchId: $matchId }) {
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
