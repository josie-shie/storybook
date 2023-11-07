interface RegularTime {
    minutes?: number;
    score?: string;
}

interface ExtraTime {
    type?: string;
    score?: string;
}

interface MatchInfo {
    kickoffTeam?: string;
    regularTime?: RegularTime;
    totalScore?: string;
    extraTime?: ExtraTime;
    penaltiesScore?: string;
    winningTeam?: string;
}

// Utility function to determine kickoff team
function getKickoffTeam(kickoffString: string): string | undefined {
    if (kickoffString === '1;') {
        return '主队先开球';
    } else if (kickoffString === '2;') {
        return '客队先开球';
    }
    return undefined;
}

// Utility function to determine winning team
function getWinningTeam(winningString: string): string | undefined {
    if (winningString === '1') {
        return '主队获胜';
    } else if (winningString === '2') {
        return '客队获胜';
    }
    return undefined;
}

export function parseMatchInfo(input: string): MatchInfo {
    const [kickoffString, matchDetails] = input.split('|');
    const details = matchDetails.split(';');
    const [regularTimeMinutes, regularTimeScore] = details[0].split(',');

    let extraTimeType: string | undefined;
    let extraTimeScore: string | undefined;
    if (details[2]) {
        [extraTimeType, extraTimeScore] = details[2].split(',');
    }

    const extraTimeTypeDesc: Record<string, string> = {
        '1': '加时赛结束',
        '2': '加时赛结束',
        '3': '加时中'
    };

    const matchInfo: MatchInfo = {
        kickoffTeam: getKickoffTeam(kickoffString),
        regularTime: {
            minutes: regularTimeMinutes ? parseInt(regularTimeMinutes, 10) : undefined,
            score: regularTimeScore
        },
        totalScore: details[1],
        extraTime: {
            type: extraTimeType ? extraTimeTypeDesc[extraTimeType] : undefined,
            score: extraTimeScore
        },
        penaltiesScore: details[3],
        winningTeam: getWinningTeam(details[4])
    };

    return matchInfo;
}
