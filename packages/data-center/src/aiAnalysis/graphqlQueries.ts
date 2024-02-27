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
                leagueLevel
                color
            }
        }
    }
`;

export const GET_FOOTBALL_STATS_MATCHES_QUERY = `
    query getMatchList($input: FootballStatsMatchInput!){
        getMatchList(input: $input) {
            matches {
              matchId
              color
              kind
              leagueId
              leagueEn
              leagueEnShort
              leagueChsShort
              leagueChtShort
              subLeagueId
              subLeagueEn
              subLeagueChs
              subLeagueCht
              matchTime
              startTime
              homeEn
              homeChs
              homeCht
              awayEn
              awayChs
              awayCht
              homeId
              awayId
              state
              homeScore
              awayScore
              homeHalfScore
              awayHalfScore
              homeRed
              awayRed
              homeYellow
              awayYellow
              homeCorner
              awayCorner
              homeRankEn
              homeRankCn
              awayRankEn
              awayRankCn
              isNeutral
              hasLineup
              season
              groupId
              roundEn
              roundCn
              grouping
              locationEn
              locationCn
              weatherEn
              weatherCn
              temp
              explainEn
              explainCn
              extraExplain
              isHidden
              injuryTime
              updateTime
              homeLogo
              awayLogo
              countryCn
              handicapCurrent
              handicapHomeCurrentOdds
              handicapAwayCurrentOdds
              overUnderCurrent
              overUnderOverCurrentOdds
              overUnderUnderCurrentOdds
              status
              hasAnimation
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
          fullHandicapUpperDaily {
            date
            matchIds
          }
          fullHandicapLowerDaily {
            date
            matchIds
          }
          fullHandicapDrawDaily {
            date
            matchIds
          }
          fullOverUnderOverDaily {
            date
            matchIds
          }
          fullOverUnderUnderDaily {
            date
            matchIds
          }
          fullOverUnderDrawDaily {
            date
            matchIds
          }
          fullTimeHomeWinDaily {
            date
            matchIds
          }
          fullTimeDrawDaily {
            date
            matchIds
          }
          fullTimeAwayWinDaily {
            date
            matchIds
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
  query checkMatchesCount($input: SmartAnalyRequestInput!){
    checkMatchesCount(input: $input) {
      list {
        leagueId
        count
      }
    }
  }
`;

export const GET_PREDICATIVE_ANALYSIS_MATCH_QUERY = `
    query getPredicativeAnalysisMatch($input: GetPredicativeAnalysisMatchInput!) {
      soccerAi {
        getPredicativeAnalysisMatch(input: $input) {
          list {
            matchId
            matchTime
            leagueId
            leagueEn
            leagueChs
            leagueCht
            leagueType
            Color
            homeId
            homeEn
            homeChs
            homeCht
            awayId
            awayEn
            awayChs
            awayCht
            homeLogo
            awayLogo
            predict
            summary
            homeStrategicAnalysis
            awayStrategicAnalysis
            homeTacticalPerspective
            awayTacticalPerspective
            updatedAt
          } 
        }
      }
    }
`;
