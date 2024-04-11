export const GET_BANNER_LIST_QUERY = `
    query getBannerList($input: GetBannerListInput!) {
        getBannerList(input: $input) {
            banners {
                id
                location
                title
                imgPath
                link
                displayTime {
                    startTime
                    endTime
                    isForever
                } 
                isActive
            }
            Pagination {
                pageCount
                totalCount
            }
        }
    }
`;
