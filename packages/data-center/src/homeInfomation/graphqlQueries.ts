export const GET_HOT_MATCH_QUERY = `
    query getHotMatch($input: MatchInput!) {
        getHotMatch(input: $input) {
            match {
                matchId
                leagueId
                leagueChsShort
                startTime
                homeChs
                awayChs
                state
                homeScore
                awayScore
                homeLogo
                awayLogo
            }
        }
    }
`;

export const GET_LEISU_NEWS_LIST_QUERY = `
    query getLeisuNewsList {
        getLeisuNewsList {
            list {
                id
                title
                imagePath
                publishedAt
            }
        }
    }
`;

export const GET_LEISU_NEWS_CONTENT_QUERY = `
    query getLeisuNewsContent($input: LeisuNewsContentInput) {
        getLeisuNewsContent(input: $input) {
            id
            sportsType
            url
            title
            category
            content
            imagePath
            publishedAt
        }
    }
`;

export const GET_HOME_PAGE_BANNER_QUERY = `
    query getHomepageBanner($input: HotMatchInput!) {
        getHomepageBanner(input: $input) {
            matchs {
              matchId
              leagueId
              leagueChsShort
              startTime
              homeChs
              awayChs
              homeScore
              awayScore
              roundCn
              homeLogo
              awayLogo
            }
            banners {
              title
              imgPath
              link
            }
        }
    }
`;
