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
        getGuessRank(memberId: $inputs) {
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
            homeLogo
            awayLogo
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
            all {
                guessType
                guessMatchList
                pagination
            }
            handicap {
                guessType
                guessMatchList
                pagination
            }
            overUnder {
                guessType
                guessMatchList
                pagination
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
            memberRankType
            memberRanking
            records
            predictedType
            predictedPlay
            predictionResult
            }
        }
    }
`;

export const GET_RRO_DISTRIB_QUERY = `
    query getProDistrib($matchId: Int, $memberId: Int){
        getProDistrib(matchId: 1, memberId: 1) {
            home
            away
            over
            under
            enoughProData
            memberPermission
        }
    }
`;

export const ADD_GUESS_MUTATION = `
    mutation addGuess($input: AddGuessInput) {
        addGuess(input: $input)
    }
`;

export const PAY_FOR_PRO_DISTRIB_MUTATION = `
    mutation payForProDistrib($matchId: Int!) {
        payForProDistrib(matchId: $matchId)
    }
`;

export const PAY_FOR_PRO_GUESS_MUTATION = `
    mutation PayForProGuess($guessId: Int!) {
        PayForProGuess(guessId: $guessId)
    }
`;

export const PAY_FOR_POST_MUTATION = `
    mutation payForPost($input: AddGuessInput) {
        payForPost(input: $input) {
            code
            message
        }
    }
`;
