export const REGISTER_MUTATION = `
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            jwtToken
        }
    }
`;

export const SEND_VERIFICATION_CODE_MUTATION = `
    mutation sendVerificationCode($input: SendVerificationCodeInput!) {
        sendVerificationCode(input: $input) {
            captcha
        }
    }
`;

export const SEND_VERIFICATION_CODE_IN_LOGGED_MUTATION = `
    mutation SendVerificationCodeLoggedIn($input: SendVerificationCodeLoggedInInput!) {
        SendVerificationCodeLoggedIn(input: $input){
            captcha
        }
    }
`;

export const LOGIN_MUTATION = `
    mutation login($input: LoginInput!) {
        login(input: $input) {
            jwtToken
        }
    }
`;

export const GET_MEMBER_INFO_QUERY = `
    query getMemberInfo {     
        getMemberInfo {
            uid
            username
            birthday
            countryCode
            mobileNumber
            wechat
            qqNumber
            avatarPath
            balance
            createdAt
        }
    }
`;

export const FORGET_PASSWORD_RESET_MUTATION = `
    mutation forgetPassword($input: ForgetPasswordInput!){
        forgetPassword(input: $input)
    }
`;

export const UPDATE_PASSWORD_MUTATION = `
    mutation updatePassword($input: UpdatePasswordInput!){
        updatePassword(input: $input)
    }
`;

export const UPDATE_MEMBER_INFO_MUTATION = `
    mutation updateMemberInfo($input: UpdateMemberInfoInput!) {
        updateMemberInfo(input: $input) 
    }
`;

export const GET_INVITATION_CODE_QUERY = `
    query getInvitationCode {
        getInvitationCode {
            invitation_code
        }
    }
`;

export const GET_SUBSCRIPTION_QUERY = `
    query getSubscriptionPlanList {
        getSubscriptionPlanList {
            subscriptionPlans {
              id
              name
              times
              cost
              masterDistribution
              masterPlan
              expertAnalysis
              gamePathAnalysis
            }
        }
    }
`;

export const GET_UNLOCKED_QUERY = `
    query getUnlockedPost($input: GetUnlockedPostInput!) {
        getUnlockedPost(input: $input) {
            list {
                postId
                analysisTitle
                analysisContent
                predictionResult
                mentorId
                mentorName
                avatarPath
                matchId
                leagueId
                leagueName
                homeTeamId
                homeTeamName
                awayTeamId
                awayTeamName
                matchTime
                createdAt
                predictStat
                memberTags {
                    memberId
                    type
                    ranking
                }  
            }
        }
    }
`;

export const SUBSCRIBE_PLAN_MUTATION = `
    mutation subscribePlan($input: SubscribePlanInput!) {
        subscribePlan(input: $input) {
            planStartAt
            planEndAt
        }
    }
`;
