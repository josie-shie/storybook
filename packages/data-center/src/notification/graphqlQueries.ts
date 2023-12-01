export const GET_MAIL_MEMBER_LIST_QUERY = `
    query getMailMemberList {
        getMailMemberList {
            mailMemberList {
                mailMemberId
                title
                content
                isRead
                createdAt
            }
        }
    }
`;

export const GET_MAIL_MEMBER_QUERY = `
    query getMailMember($input: GetMailMemberInput) {
        getMailMember(input: $input) {
            mailMemberId
            title
            content
            isRead
            createdAt
        }
    }
`;

export const DELETE_MAIL_MEMBER_MUTATION = `
    mutation deleteMailMember($input: DeleteMailMemberInput!) {
        deleteMailMember(input: $input)
    }
`;
