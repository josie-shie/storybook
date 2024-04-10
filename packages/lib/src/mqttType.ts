export interface NewMessageNotify {
    sender: string;
    roomId: string;
    number: number;
}
export interface UnreadMessageNotify {
    totalCount: number;
    chatCount: number;
    mailCount: number;
}

export interface NotifyMessage {
    uid: string;
    notifyType: 0 | 1 | 2 | 3 | 4;
    newMessageNotify: NewMessageNotify;
    unreadMessageNotify: UnreadMessageNotify;
}

export interface OriginalContestInfo {
    leagueChsShort: string;
    awayChs: string;
    awayCorner: number;
    awayHalfScore: number;
    awayRed: number;
    awayScore: number;
    awayYellow: number;
    homeChs: string;
    homeCorner: number;
    homeHalfScore: number;
    homeRed: number;
    homeScore: number;
    homeYellow: number;
    explainEn: string;
    explainCn: string;
    extraExplain: string;
    hasLineup: string;
    injuryTime: string;
    matchId: number;
    matchTime: number;
    startTime: number;
    state: number;
    color: string;
    countryCn: string;
}

export interface TechnicalInfoData {
    matchId: number;
    technicStat: {
        away: string;
        home: string;
        technicType:
            | '0'
            | '1'
            | '2'
            | '3'
            | '4'
            | '5'
            | '6'
            | '7'
            | '8'
            | '9'
            | '10'
            | '11'
            | '12'
            | '13'
            | '14'
            | '15'
            | '16'
            | '17'
            | '18'
            | '19'
            | '20'
            | '21'
            | '22'
            | '23'
            | '24'
            | '25'
            | '26'
            | '27'
            | '28'
            | '29'
            | '30'
            | '31'
            | '32'
            | '33'
            | '34'
            | '35'
            | '36'
            | '37'
            | '38'
            | '39'
            | '40'
            | '41'
            | '42'
            | '43'
            | '44'
            | '45'
            | '46'
            | '47';
    }[];
}

export interface EventInfo {
    id?: number;
    matchId: number;
    isHome: boolean;
    kind: number;
    kindName?: string;
    time: string;
    nameEn?: string;
    nameChs: string;
    nameCht?: string;
    playerId: string;
    playerId2: string;
    nameEn2?: string;
    nameChs2: string;
    nameCht2?: string;
    overtime: string;
}

export interface MqttEventListType {
    matchId: number;
    event: EventInfo[];
}

export interface TextLive {
    main?: number;
    type?: number;
    position: number;
    time: string;
    data: string;
}

export interface TextLiveRequest {
    matchId: number;
    textLiveData: string;
}

export interface TextLiveResponse extends TextLive {
    matchId: number;
    textLiveData: TextLive[];
}

export interface OddsRunningType {
    matchId: number;
    companyId: number;
    odds1: string;
    odds2: string;
    odds3: string;
    type: number;
    modifytime: number;
}
