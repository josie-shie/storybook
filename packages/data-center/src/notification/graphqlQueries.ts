export const GET_MAIL_MEMBER_LIST_QUERY = `
    query getMailMember($input: GetNotifyMessageListRequest)  {
        messageCenterQuery {
            GetMemberNotifyMessageList(input: $input ) {
                list {
                    notifyId
                    memberId
                    eventTypeId
                    mrlId
                    tag {
                        tagId
                        tagName
                        tagColor
                    } 
                    message {
                        title
                        content
                        coverImage
                        contentImage
                        senderName
                        senderAvatar
                        sentAt
                    } 
                    cta {
                        label
                        url
                    } 
                    readAt
                    notifyAt
                }
                pagination {
                    pageCount
                    totalCount
                }
            }
        }
    }
`;

export const DELETE_MAIL_MEMBER_MUTATION = `
    mutation delNotifyMessages($input: DelNotifyMessagesInput!){
        messageCenterMutation {
                delNotifyMessages(input: $input) {
                responseCode
            }
        }
    }
`;

export const UPDATE_MAIL_READ_AT_MUTATION = `
    mutation updateMessageReadAt($input: UpdateMessageReadAtInput!){
        messageCenterMutation {
                updateMessageReadAt(input: $input) {
                responseCode
            }
        }
    }
`;

export const GET_MEMBER_MESSAGE_CENTER_UNREAD_COUNT = `
    query getMemberMessageCenterUnreadCount{
        messageCenterQuery {
            GetMemberMessageCenterUnreadCount {
                notifyMessageCount
                chatRoomCount
            }
        }
    }
`;
