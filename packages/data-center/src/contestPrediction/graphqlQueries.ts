export const GET_MATCH_POSTS_QUERY = `
    query getMatchPosts($input: MatchPostListRequestInput) {
        getMatchPosts(input: $input) {
            posts {
                id
                matchId
                leagueId
                leagueName
                homeTeamId
                homeTeamName
                awayTeamId
                awayTeamName
                homeTeamScore
                awayTeamScore
                handicap
                homeTeamOdds
                awayTeamOdds
                overUnder
                overOdds
                underOdds
                mentorId
                mentorName
                predictedPlay
                analysisTitle
                price
                predictionResult
                matchTime
                createdBy
                createdAt
                updatedBy
                updatedAt
                avatarPath
                mentorLevel
                lastTenAnalysisResult
                weekHitRate
                shortAnalysisContent
            }
            total_page_count
        }
    }
`;
