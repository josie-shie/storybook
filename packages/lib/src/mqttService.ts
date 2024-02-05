import type { MqttClient } from 'mqtt';
import * as mqtt from 'mqtt';
import { getRandomInt } from './random';

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
    notifyType: 0 | 1 | 2 | 3;
    newMessageNotify: NewMessageNotify;
    unreadMessageNotify: UnreadMessageNotify;
}

interface OriginalContestInfo {
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

interface TechnicalInfoData {
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

interface EventInfo {
    matchId: number;
    isHome: boolean;
    kind: number;
    nameChs: string;
    nameCht: string;
    nameEn: string;
    overtime: string;
    playerId: string;
    playerId2: string;
    time: string;
}

interface TextLive {
    main?: number;
    type?: number;
    position: number;
    time: string;
    data: string;
}

interface TextLiveRequest {
    matchId: number;
    textLiveData: string;
}

interface TextLiveResponse extends TextLive {
    matchId: number;
    textLiveData: TextLive[];
}

let client: MqttClient;
let isConnect = false;

const textDecoder = new TextDecoder();

const useMessageQueue: ((data: OriginalContestInfo) => void)[] = [];
const useEventQueue: ((data: EventInfo) => void)[] = [];
const useTextLiveQueue: ((data: TextLiveResponse) => void)[] = [];
const useTechnicalQueue: ((data: TechnicalInfoData) => void)[] = [];
const useOddsRunningQueue: ((data: OddsRunningType) => void)[] = [];
const usedNotifyMessageQueue: ((data: NotifyMessage) => void)[] = [];

let init = true;

const handleContestMessage = (message: Buffer) => {
    const messageObject = JSON.parse(textDecoder.decode(message)) as OriginalContestInfo;

    for (const messageMethod of useMessageQueue) {
        messageMethod(messageObject as unknown as OriginalContestInfo);
    }
};

export type OddChangeMatch = Partial<{
    matchId: number;
    homeScore: number;
    awayScore: number;
    state: number;
}>;

export type OddsMatch = OddChangeMatch &
    Partial<{
        matchTime: number;
        startTime: number;
        leagueId: number;
        leagueEn: string;
        leagueChs: string;
        leagueCht: string;
        homeEn: string;
        homeChs: string;
        homeCht: string;
        awayEn: string;
        awayChs: string;
        awayCht: string;
        homeId: number;
        awayId: number;
        homeRank: string;
        awayRank: string;
        isNeutral: boolean;
        homeRed: number;
        awayRed: number;
    }>;

export type OddChangeHandicapHalf = Partial<{
    matchId: number;
    companyId: number;
    currentHandicap: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
    oddsChangeTime: number;
    oddsType: number;
}>;

export type OddsHandicapHalf = OddChangeHandicapHalf &
    Partial<{
        initialHandicap: number;
        homeInitialOdds: number;
        awayInitialOdds: number;
    }>;

export type OddChangeHandicap = Partial<{
    matchId: number;
    companyId: number;
    currentHandicap: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
    isMaintained: boolean;
    isInProgress: boolean;
    oddsChangeTime: number;
    isClosed: boolean;
    oddsType: number;
}>;

export type OddsHandicap = OddChangeHandicap &
    Partial<{
        initialHandicap: number;
        homeInitialOdds: number;
        awayInitialOdds: number;
    }>;

export type OddChangeOverUnderHalf = Partial<{
    matchId: number;
    companyId: number;
    currentHandicap: number;
    currentOverOdds: number;
    currentUnderOdds: number;
    oddsChangeTime: number;
    oddsType: number;
}>;

export type OddsOverUnderHalf = OddChangeOverUnderHalf &
    Partial<{
        initialHandicap: number;
        initialOverOdds: number;
        initialUnderOdds: number;
    }>;

export type OddChangeOverUnder = Partial<{
    matchId: number;
    companyId: number;
    currentHandicap: number;
    currentOverOdds: number;
    currentUnderOdds: number;
    oddsChangeTime: number;
    isClosed: boolean;
    oddsType: number;
}>;

export type OddsOverUnder = OddChangeOverUnder &
    Partial<{
        initialHandicap: number;
        initialOverOdds: number;
        initialUnderOdds: number;
    }>;

export type OddChangeEuropeOddsHalf = Partial<{
    matchId: number;
    companyId: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: number;
    isClosed: boolean;
    oddsType: number;
}>;

export type OddsEuropeOddsHalf = OddChangeEuropeOddsHalf &
    Partial<{
        initialHandicap: number;
        homeInitialOdds: number;
        awayInitialOdds: number;
    }>;

export type OddChangeEuropeOdds = Partial<{
    matchId: number;
    companyId: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: number;
    oddsType: number;
    isClosed: boolean;
}>;

export type OddsEuropeOdds = OddChangeEuropeOdds &
    Partial<{
        initialHandicap: number;
        homeInitialOdds: number;
        awayInitialOdds: number;
    }>;

export type OddsChangeHashTable = Record<
    string,
    Record<
        string,
        {
            handicapHalf: OddChangeHandicapHalf;
            handicap: OddChangeHandicap;
            overUnderHalf: OddChangeOverUnderHalf;
            overUnder: OddChangeOverUnder;
            europeOddsHalf: OddChangeEuropeOddsHalf;
            europeOdds: OddChangeEuropeOdds;
        }
    >
>;

export type OddsHashTable = Record<
    string,
    Record<
        string,
        {
            handicapHalf: OddsHandicapHalf;
            handicap: OddsHandicap;
            overUnderHalf: OddsOverUnderHalf;
            overUnder: OddsOverUnder;
            europeOddsHalf: OddsEuropeOddsHalf;
            europeOdds: OddsEuropeOdds;
        }
    >
>;

export type KeyMap =
    | 'handicapHalf'
    | 'handicap'
    | 'overUnderHalf'
    | 'overUnder'
    | 'europeOddsHalf'
    | 'europeOdds';

interface ListWithIdAndCompany {
    matchId?: number;
    companyId?: number;
    [key: string]: unknown; // 允许任何其他属性
}

export function integrateData(
    lists: ListWithIdAndCompany[],
    type: KeyMap,
    hashTable: OddsChangeHashTable | OddsHashTable
) {
    lists.forEach(item => {
        const { matchId = 0, companyId = 0, ...rest } = item;

        if (matchId && companyId) {
            if (!hashTable[matchId] as boolean) {
                hashTable[matchId] = {};
            }

            if (!hashTable[matchId][companyId] as boolean) {
                hashTable[matchId][companyId] = {
                    handicapHalf: {},
                    handicap: {},
                    overUnderHalf: {},
                    overUnder: {},
                    europeOddsHalf: {},
                    europeOdds: {}
                };
            }

            hashTable[matchId][companyId][type] = { ...rest };
        }
    });
}

const handleDetailEventMessage = (message: Buffer) => {
    const messageObject = JSON.parse(textDecoder.decode(message)) as EventInfo;

    for (const messageMethod of useEventQueue) {
        messageMethod(messageObject as unknown as EventInfo);
    }
};

const handleDetailTextLiveMessage = (message: Buffer) => {
    const messageObject = JSON.parse(textDecoder.decode(message)) as TextLiveRequest;

    const formatTextLive = {
        matchId: messageObject.matchId,
        textLiveData: JSON.parse(messageObject.textLiveData) as TextLive[]
    };

    for (const messageMethod of useTextLiveQueue) {
        messageMethod(formatTextLive as unknown as TextLiveResponse);
    }
};

const handleDetailTechnicListMessage = (message: Buffer) => {
    const messageObject = JSON.parse(textDecoder.decode(message)) as TechnicalInfoData;

    for (const messageMethod of useTechnicalQueue) {
        messageMethod(messageObject as unknown as TechnicalInfoData);
    }
};

const handleNotifyMessage = (message: Buffer) => {
    const messageObject = JSON.parse(textDecoder.decode(message)) as NotifyMessage;

    for (const messageMethod of usedNotifyMessageQueue) {
        messageMethod(messageObject as unknown as NotifyMessage);
    }
};

export interface OddsRunningType {
    matchId: number;
    companyId: number;
    odds1: string;
    odds2: string;
    odds3: string;
    type: number;
    modifytime: number;
}

const handleOddRunningMessage = (message: Buffer) => {
    const messageObject = JSON.parse(textDecoder.decode(message)) as OddsRunningType;

    for (const messageMethod of useOddsRunningQueue) {
        messageMethod(messageObject);
    }
};

export const mqttService = {
    init: ({ memberId }: { memberId: number }) => {
        const MQTT_OPTIONS = {
            qos: 1,
            clean: false,
            clientId: memberId ? `member_${memberId}` : `guest_${getRandomInt(1, 999999)}`
        };
        if (init) {
            client = mqtt.connect(`${process.env.NEXT_PUBLIC_MQTT_PATH}`, MQTT_OPTIONS);
            client.on('connect', () => {
                // eslint-disable-next-line no-console -- Check lifecycle
                console.log('Mqtt connected');
                client.subscribe('updatematch');
                client.subscribe('updateevent');
                client.subscribe('updatetext_live');
                client.subscribe(`sport/user_notify/${memberId}`);
                client.subscribe('updateodds_running');

                // client.subscribe('updatetechnic'); 技術統計 站不做
            });
            client.on('message', (topic, message) => {
                if (topic === 'updatematch') handleContestMessage(message);
                if (topic === 'updateevent') handleDetailEventMessage(message);
                if (topic === 'updatetext_live') handleDetailTextLiveMessage(message);
                if (topic === `sport/user_notify/${memberId}`) handleNotifyMessage(message);
                if (topic === 'updateodds_running') handleOddRunningMessage(message);
                if (topic === 'updatetechnic') handleDetailTechnicListMessage(message);
            });
            init = false;

            if (isConnect) {
                mqttService.oddRunningInit();
            }
        }
        return client;
    },
    oddRunningInit: () => {
        if (!init) {
            // eslint-disable-next-line no-console -- Check lifecycle
            console.log('Mqtt oddRunning connected');
            client.subscribe('updateodds_running');

            client.on('message', (topic, message) => {
                if (topic === 'updateodds_running') handleOddRunningMessage(message);
            });
        } else {
            isConnect = true;
        }
    },
    oddRunningDeinit: () => {
        // eslint-disable-next-line no-console -- Check lifecycle
        console.log('Mqtt oddRunning deinit');
        client.unsubscribe('updateodds_running');
    },
    getMessage: (onMessage: (data: OriginalContestInfo) => void) => {
        useMessageQueue.push(onMessage);
    },
    getEventList: (onMessage: (data: EventInfo) => void) => {
        useEventQueue.push(onMessage);
    },
    getTextLiveList: (onMessage: (data: TextLiveResponse) => void) => {
        useTextLiveQueue.push(onMessage);
    },
    getTechnicList: (onMessage: (data: TechnicalInfoData) => void) => {
        useTechnicalQueue.push(onMessage);
    },
    getOddsRunning: (onMessage: (data: OddsRunningType) => void) => {
        useOddsRunningQueue.push(onMessage);
    },
    getNotifyMessage: (onMessage: (data: NotifyMessage) => void) => {
        usedNotifyMessageQueue.push(onMessage);
    }
};
