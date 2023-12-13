export const GET_FOLLOWERS_QUERY = `
    query getFollow($input: GetFollowInput!) {
        getFollow(input: $input) {
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

export const UPDATE_FOLLOW_MUTATION = `
    mutation updateFollow($input: MyFollowInput!) {
        updateFollow(input: $input) {
            responseCode
        }
    }
`;

export const DELETE_FOLLOW_MUTATION = `
    mutation deleteFollow($input: MyFollowInput!) {
        deleteFollow(input: $input){
            responseCode
        }
    }
`;
