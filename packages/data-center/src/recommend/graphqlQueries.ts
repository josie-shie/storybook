export const GET_INDEX_POSTS_QUERY = `
    query getIndexPosts($input: IndexPostListRequestInput) {
        getIndexPosts(input: $input) {
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
                lastTenAnalysisWinCount
                lastTenAnalysisWinCountStr
            }
            total_page_count
        }
    }
`;

export const GET_MENTOR_POSTS_QUERY = `
    query getMentorPosts($input: MentorPostListRequestInput) {
        getMentorPosts(input: $input) {
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
                lastTenAnalysisWinCount
                lastTenAnalysisWinCountStr
            }
            total_page_count
        }
    }
`;
// remove it if no where
// export const GET_MATCH_POST_QUERY = `
//     query getMatchPosts($input: MentorPostListRequestInput) {
//         getMatchPosts(input: $input) {
//             posts {
//                 id
//                 matchId
//                 leagueId
//                 leagueName
//                 homeTeamId
//                 homeTeamName
//                 awayTeamId
//                 awayTeamName
//                 homeTeamScore
//                 awayTeamScore
//                 handicap
//                 homeTeamOdds
//                 awayTeamOdds
//                 overUnder
//                 overOdds
//                 underOdds
//                 mentorId
//                 mentorName
//                 predictedPlay
//                 analysisTitle
//                 price
//                 predictionResult
//                 matchTime
//                 createdBy
//                 createdAt
//                 updatedBy
//                 updatedAt
//                 avatarPath
//                 mentorLevel
//                 lastTenAnalysisResult
//                 weekHitRate
//                 shortAnalysisContent
//                 lastTenAnalysisWinCount
//                 lastTenAnalysisWinCountStr
//             }
//             total_page_count
//         }
//     }
// `;

export const GET_POST_DETAIL_QUERY = `
    query getPostDetail($input: PostDetailInput!) {
        getPostDetail(input: $input) {
            id
            matchId
            leagueId
            state
            leagueName
            homeTeam {
              id
              name
              score
              logo
            }
            awayTeam {
              id
              name
              score
              logo
            }
            odds {
              handicap
              homeTeamOdds
              awayTeamOdds
              overUnder
              overOdds
              underOdds
            }
            mentorId
            mentorName
            mentorImage
            mentorLevel
            playType
            predictedPlay
            analysisTitle
            analysisContent
            shortAnalysisContent
            price
            predictionResult
            matchTime
            createdAt
            fansNumber
            unlockNumber
            followed
            tag {
              id
              tagName
              note
              colorCode
              weekHitRecentTen
              weekMaxAccurateStreak
              weekHitMatches
              weekTotalMatches
              weekHitRate
              weekHitRateDisplay
              weekRanking
              weekHistoryMaxWinStreak
              monthHitRecentTen
              monthMaxAccurateStreak
              monthHitMatches
              monthTotalMatches
              monthHitRate
              monthHitRateDisplay
              monthRanking
              monthHistoryMaxWinStreak
              quarterHitRecentTen
              quarterMaxAccurateStreak
              quarterHitMatches
              quarterTotalMatches
              quarterHitRate
              quarterHitRateDisplay
              quarterRanking
              quarterHistoryMaxWinStreak
              winHitRecentTen
              winMaxAccurateStreak
              winHitMatches
              winTotalMatches
              winHitRate
              winHitRateDisplay
              winRanking
              winHistoryMaxWinStreak
            }
        }
    }
`;

export const GET_MENTOR_LIST_QUERY = `
    query getMentorList($input: MentorInput) {
        getMentorList(input: $input) {
            list {
                memberId
                username
                avatarPath
                profile
                fans
                unlocked
                isFollowed
                tags {
                    id
                    tagName
                    note
                    colorCode
                    weekHitRecentTen
                    weekMaxAccurateStreak
                    weekHitMatches
                    weekTotalMatches
                    weekHitRate
                    weekHitRateDisplay
                    weekRanking
                    weekHistoryMaxWinStreak
                    monthHitRecentTen
                    monthMaxAccurateStreak
                    monthHitMatches
                    monthTotalMatches
                    monthHitRate
                    monthHitRateDisplay
                    monthRanking
                    monthHistoryMaxWinStreak
                    quarterHitRecentTen
                    quarterMaxAccurateStreak
                    quarterHitMatches
                    quarterTotalMatches
                    quarterHitRate
                    quarterHitRateDisplay
                    quarterRanking
                    quarterHistoryMaxWinStreak
                    winHitRecentTen
                    winMaxAccurateStreak
                    winHitMatches
                    winTotalMatches
                    winHitRate
                    winHitRateDisplay
                    winRanking
                    winHistoryMaxWinStreak
                } 
            }
        }
    }
`;

export const GET_POST_LIST_QUERY = `
    query getPostList($input: PostListInput!){
        getPostList(input: $input) {
            posts {
                id
                matchId
                matchTime
                countryId
                countryName
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
                avatarPath
                mentorLevel
                analysisTitle
                analysisContent
                shortAnalysisContent
                price
                predictedPlay
                predictionResult
                createdBy
                createdAt
                updatedBy
                updatedAt
                lastTenAnalysisResult
                weekHitRate
                lastTenAnalysisWinCount
                lastTenAnalysisWinCountStr
                unlockCounts
                articleCount
                tag {
                    id
                    tagName
                    note
                    colorCode
                    weekHitRecentTen
                    weekMaxAccurateStreak
                    weekHitMatches
                    weekTotalMatches
                    weekHitRate
                    weekHitRateDisplay
                    weekRanking
                    weekHistoryMaxWinStreak
                    monthHitRecentTen
                    monthMaxAccurateStreak
                    monthHitMatches
                    monthTotalMatches
                    monthHitRate
                    monthHitRateDisplay
                    monthRanking
                    monthHistoryMaxWinStreak
                    quarterHitRecentTen
                    quarterMaxAccurateStreak
                    quarterHitMatches
                    quarterTotalMatches
                    quarterHitRate
                    quarterHitRateDisplay
                    quarterRanking
                    quarterHistoryMaxWinStreak
                    winHitRecentTen
                    winMaxAccurateStreak
                    winHitMatches
                    winTotalMatches
                    winHitRate
                    winHitRateDisplay
                    winRanking
                    winHistoryMaxWinStreak
                } 
                isUnlocked
            }
            totalPage
            totalArticle
        }
    }
`;

export const GET_MEMBER_PROFILE_WITH_MEMBER_ID_QUERY = `
    query getMemberProfileWithMemberId($input: GetMemberProfileWithMemberIdInput!){
        getMemberProfileWithMemberId(input: $input) {
            memberId
            username
            avatarPath
            profile
            fansCount
            unlockedCount
            isFollowed
            highlights {
                id
                tagName
                note
                colorCode
                weekHitRecentTen
                weekMaxAccurateStreak
                weekHitMatches
                weekTotalMatches
                weekHitRate
                weekHitRateDisplay
                weekRanking
                weekHistoryMaxWinStreak
                monthHitRecentTen
                monthMaxAccurateStreak
                monthHitMatches
                monthTotalMatches
                monthHitRate
                monthHitRateDisplay
                monthRanking
                monthHistoryMaxWinStreak
                quarterHitRecentTen
                quarterMaxAccurateStreak
                quarterHitMatches
                quarterTotalMatches
                quarterHitRate
                quarterHitRateDisplay
                quarterRanking
                quarterHistoryMaxWinStreak
                winHitRecentTen
                winMaxAccurateStreak
                winHitMatches
                winTotalMatches
                winHitRate
                winHitRateDisplay
                winRanking
                winHistoryMaxWinStreak
            }
        }
    }
`;
