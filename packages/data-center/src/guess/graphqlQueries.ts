export const GET_TODAY_GUESS_MATCHES_QUERY = `
    query getTodayGuessMatches{
        getTodayGuessMatches{
            matches {
                matchId
                leagueId
                leagueName
                homeId
                homeName
                awayId
                awayName
                matchTime
                homeScore
                awayScore
                handicap
                handicapHomeOdds
                handicapAwayOdds
                overUnder
                overUnderOverOdds
                overUnderUnderOdds
                totalNum
                guessed
                state
                homeLogo
                awayLogo
            }
        }
    }
`;

export const GET_GUESS_RANK_QUERY = `
    query getGuessRank($inputs: GetGuessRankInput!){
        getGuessRank(input: $inputs) {
            guessRank {
                memberId
                memberName
                memberLevel
                memberAvatar
                ranking
                today
                totalMatches
                totalWin
                totalLose
                hitRate
                currentMaxWinStreak
                historyMaxWinStreak
              }
            memberRank {
                memberId
                memberName
                memberLevel
                memberAvatar
                ranking
                today
                totalMatches
                totalWin
                totalLose
                hitRate
                currentMaxWinStreak
                historyMaxWinStreak
            }
        }
    }
`;

export const GET_GUESS_PROPORTION_QUERY = `
    query getGuessProportion($matchId: Int, $memberId: Int){
        getGuessProportion(matchId: $matchId, memberId: $memberId) {
            handicap
            handicapInChinese
            overUnder
            home {
              peopleNum
              itemType
            }
            away {
              peopleNum
              itemType
            }
            over {
              peopleNum
              itemType
            }
            under {
              peopleNum
              itemType
            }
            guessNum
            remainingGuessTimes
        }
    }
`;

export const GET_MEMBER_INDIVIDUAL_GUESS_QUERY = `
    query getMemberIndividualGuess($input: GetMemberIndividualGuessInput!){
        getMemberIndividualGuess(input: $input) {
            weekRecord {
              recordPeriod
              rank
              totalPlay
              totalPlayWin
              totalPlayDraw
              totalPlayLose
              handicapPlay
              handicapWin
              handicapDraw
              handicapLose
              overUnderPlay
              overUnderWin
              overUnderDraw
              overUnderLose
            }
            monthRecord {
              recordPeriod
              rank
              totalPlay
              totalPlayWin
              totalPlayDraw
              totalPlayLose
              handicapPlay
              handicapWin
              handicapDraw
              handicapLose
              overUnderPlay
              overUnderWin
              overUnderDraw
              overUnderLose
            }
            quarterRecord {
              recordPeriod
              rank
              totalPlay
              totalPlayWin
              totalPlayDraw
              totalPlayLose
              handicapPlay
              handicapWin
              handicapDraw
              handicapLose
              overUnderPlay
              overUnderWin
              overUnderDraw
              overUnderLose
            }
        }
    }
`;

export const GET_MEMBER_INDIVIDUAL_GUESS_MATCHES_QUERY = `
    query getMemberIndividualGuessMatches($input: GetMemberIndividualGuessMatchesInput!){
        getMemberIndividualGuessMatches(input: $input) {
            guessType
            guessMatchList {
                id
                matchId
                matchTime
                leagueId
                leagueName
                homeTeamName
                awayTeamName
                playType
                handicapOdds
                handicapInChinese
                overUnderOdds
                predictedPlay
                predictionResult
                isPaidToRead
                unlockPrice
            }
            pagination {
                pageCount
                totalCount
            }
        }
    }
`;
export const GET_MENTOR_INDIVIDUAL_GUESS_MATCHES_QUERY = `
    query getMentorIndividualGuessMatches($input: GetMemberIndividualGuessMatchesInput!){
        getMentorIndividualGuessMatches(input: $input) {
            guessType
            guessMatchList {
                id
                matchId
                matchTime
                leagueId
                leagueName
                homeTeamName
                awayTeamName
                playType
                handicapOdds
                handicapInChinese
                overUnderOdds
                predictedPlay
                predictionResult
                isPaidToRead
                unlockPrice
            }
            pagination {
                pageCount
                totalCount
            }
        }
    }
`;

export const GET_RRO_GUESS_QUERY = `
    query getProGuess($matchId: Int, $memberId: Int){
        getProGuess(matchId: $matchId, memberId: $memberId) {
            proGuess {
                guessId
                memberId
                memberName
                avatarPath
                records
                predictedType
                predictedPlay
                predictionResult
                handicapOdds
                handicapInChinese
                overUnderOdds
                highlights {
                    id
                    type
                    value
                } 
            }
            unlockPrice
            freeUnlockChance
        }
    }
`;

export const GET_RRO_DISTRIB_QUERY = `
    query getProDistrib($matchId: Int, $memberId: Int){
        getProDistrib(matchId: $matchId, memberId: $memberId) {
            home
            away
            over
            under
            enoughProData
            memberPermission
            unlockPrice
        }
    }
`;

export const ADD_GUESS_MUTATION = `
    mutation addGuess($input: AddGuessInput) {
        addGuess(input: $input) {
            remainingGuessTimes
        }
    }
`;

export const PAY_FOR_PRO_DISTRIB_MUTATION = `
    mutation payForProDistrib($matchId: Int!) {
        payForProDistrib(matchId: $matchId) {
            currentBalance
            home
            away
            over
            under
          }
    }
`;

export const PAY_FOR_PRO_GUESS_MUTATION = `
    mutation payForProGuess($guessId: Int!) {
        payForProGuess(guessId: $guessId) { 
            guessId
            currentBalance
            predictedPlay
        }
    }
`;

export const PAY_FOR_POST_MUTATION = `
    mutation payForPost($input: PayForPostInput!) {
        payForPost(input: $input) {
            code
            message
        }
    }
`;
