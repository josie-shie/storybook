export const GET_FORBIDDEN_WORDS_QUERY = `
    query getForbiddenWords {
        getForbiddenWords {
            forbidden_word
            replaced_word
            sensitive_level
        }
    }
`;
