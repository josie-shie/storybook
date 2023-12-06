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
    mutation deleteMailMember($input: MyFollowInput!) {
        deleteMailMember(input: $input){
            responseCode
        }
    }
`;
