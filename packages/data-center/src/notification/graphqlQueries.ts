export const GET_MAIL_MEMBER_LIST_QUERY = `
    query getMailMemberList {
        getMailMemberList {
            mailMemberList {
                mailMemberId
                title
                content
                coverImage
                contentImage
                ctaButtonName
                ctaLink
                isRead
                createdAt
                tag {
                    id
                    tagName
                    colorCode
                }
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
            coverImage
            contentImage
            ctaButtonName
            ctaLink
            isRead
            createdAt
            tag {
                id
                tagName
                colorCode
            }
        }
    }
`;

export const DELETE_MAIL_MEMBER_MUTATION = `
    mutation deleteMailMember($input: DeleteMailMemberInput!) {
        deleteMailMember(input: $input)
    }
`;
