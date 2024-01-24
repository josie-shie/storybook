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
                homeLogo
                awayId
                awayChs: awayName
                awayLogo
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
    query getFootballStatsMatches($input: FootballStatsMatchInput!){
        getFootballStatsMatches(input: $input) {
            matches {
                matchId
                leagueId
                leagueChsShort: leagueChs
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

export const GET_FOOTBALL_STATS_QUERY = `
    query getFootballStats($input: SmartAnalyRequestInput!) {
        getFootballStats(input: $input) {
          memberId
          ticketId
          handicapSide
          handicapValues
          overUnderValues
          startTime
          endTime
          analyTime
          errorStatus
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
        }
    }
`;

export const GET_FOOTBALL_LEAGUE_QUERY = `
  query getLeague($input: LeagueInput!){
    getLeague(input: $input) {
      list {
          leagueId
          color
          nameEn
          nameEnShort
          nameChs
          leagueChsShort
          nameCht
          nameChtShort
          type
          subSclassEn
          subSclassCn
          sumRound
          currRound
          currSeason
          countryId
          countryEn
          countryCn
          leagueLogo
          countryLogo
          areaId
          rating
        }
    }
  }
`;

export const CHECK_MATCHES_COUNT_QUERY = `
  query checkMatchesCount($input: MatchesCountInput!){
    checkMatchesCount(input: $input) {
      list {
        leagueId
        count
      }
    }
  }
`;
