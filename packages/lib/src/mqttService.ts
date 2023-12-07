import type { MqttClient } from 'mqtt';
import * as mqtt from 'mqtt';
import {
    deProto,
    deProtoOdds,
    deProtoOddsChange,
    deProtoDetailEvent,
    deProtoDetailTechnicList,
    deProtoOddRunning,
    deProtoOddRunningHalf,
    deProtoAnalysis
} from './prtobuf';

interface AnalysisRequest {
    mission: string;
    uid: number;
    handicap_side: string;
    handicap_values: string;
    overUnder_values: string;
    startTime: number;
    endTime: number;
}

interface AnalysisResponse {
    mission: string;
    uid: number;
    ticket_id: number;
    handicap_side: string;
    handicap_values: string;
    overUnder_values: string;
    time_ranges: string;
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
    id: number;
    isHome: boolean;
    kind: 2 | 1 | 3 | 7 | 8 | 9 | 11 | 13 | 14;
    nameChs: string;
    nameCht: string;
    nameEn: string;
    overtime: string;
    playerId: string;
    playerId2: string;
    time: string;
}

interface EventInfoData {
    matchId: number;
    event: EventInfo[];
}

let client: MqttClient;
let isConnect = false;

const useMessageQueue: ((data: OriginalContestInfo) => void)[] = [];
const useOddsQueue: ((data: OddsType) => void)[] = [];
const useOddsChangeQueue: ((data: OddChangeType) => void)[] = [];
const useTechnicalQueue: ((data: TechnicalInfoData) => void)[] = [];
const useEventQueue: ((data: EventInfoData) => void)[] = [];
const useOddsRunningQueue: ((data: OddsRunningHashTable) => void)[] = [];
const useOddsRunningHalfQueue: ((data: OddsRunningHashTable) => void)[] = [];
const useAnalysisQueue: ((data: AnalysisResponse) => void)[] = [];

let init = true;

const toSerializableObject = <T extends Record<string, unknown>>(protoObj: T): T => {
    const result: Partial<T> = {};
    for (const key in protoObj) {
        if (Object.prototype.hasOwnProperty.call(protoObj, key)) {
            result[key] = protoObj[key];
        }
    }

    return result as T;
};

const handleContestMessage = async (message: Buffer) => {
    const messageObject = await deProto(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useMessageQueue) {
        messageMethod(decodedMessage as unknown as OriginalContestInfo);
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

export interface OddChangeType {
    match?: OddChangeMatch;
    handicapHalfList?: OddChangeHandicapHalf[];
    handicapList?: OddChangeHandicap[];
    overUnderHalfList?: OddChangeOverUnderHalf[];
    overUnderList?: OddChangeOverUnder[];
    europeOddsHalfList?: OddChangeEuropeOddsHalf[];
    europeOddsList?: OddChangeEuropeOdds[];
}

export interface OddsType {
    match?: OddsMatch;
    handicapHalfList?: OddsHandicapHalf[];
    handicapList?: OddsHandicap[];
    overUnderHalfList?: OddsOverUnderHalf[];
    overUnderList?: OddsOverUnder[];
    europeOddsHalfList?: OddsEuropeOddsHalf[];
    europeOddsList?: OddsEuropeOdds[];
}

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

function createHashTable(data: OddChangeType | OddsType) {
    const hashTable = {};
    const {
        handicapHalfList = [],
        handicapList = [],
        overUnderHalfList = [],
        overUnderList = [],
        europeOddsHalfList = [],
        europeOddsList = []
    } = data;

    integrateData(handicapHalfList, 'handicapHalf', hashTable);
    integrateData(handicapList, 'handicap', hashTable);
    integrateData(overUnderHalfList, 'overUnderHalf', hashTable);
    integrateData(overUnderList, 'overUnder', hashTable);
    integrateData(europeOddsHalfList, 'europeOddsHalf', hashTable);
    integrateData(europeOddsList, 'europeOdds', hashTable);

    return hashTable;
}

const handleOddsMessage = async (message: Buffer) => {
    const messageObject = await deProtoOdds(message);
    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );
    for (const messageMethod of useOddsQueue) {
        const formatDecodedMessage = createHashTable(decodedMessage);
        messageMethod(formatDecodedMessage);
    }
};

const handleOddsChangeMessage = async (message: Buffer) => {
    const messageObject = await deProtoOddsChange(message);
    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useOddsChangeQueue) {
        const formatDecodedMessage = createHashTable(decodedMessage);
        messageMethod(formatDecodedMessage);
    }
};

const handleDetailEventMessage = async (message: Buffer) => {
    const messageObject = await deProtoDetailEvent(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useEventQueue) {
        messageMethod(decodedMessage as unknown as EventInfoData);
    }
};

const handleDetailTechnicListMessage = async (message: Buffer) => {
    const messageObject = await deProtoDetailTechnicList(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useTechnicalQueue) {
        messageMethod(decodedMessage as unknown as TechnicalInfoData);
    }
};

const handleAnalysisMessage = async (message: Buffer) => {
    const messageObject = await deProtoAnalysis(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useAnalysisQueue) {
        messageMethod(decodedMessage as unknown as AnalysisResponse);
    }
};

export interface OddsRunningType {
    matchId?: number;
    isHalf: boolean;
    data?: {
        id: number;
        matchId: number;
        time: string;
        homeScore: number;
        awayScore: number;
        homeRed: number;
        awayRed: number;
        type: number;
        companyId: number;
        odds1: string;
        odds2: string;
        odds3: string;
        modifytime: number;
    }[];
    list?: {
        id: number;
        matchId: number;
        time: string;
        homeScore: number;
        awayScore: number;
        homeRed: number;
        awayRed: number;
        type: number;
        companyId: number;
        odds1: string;
        odds2: string;
        odds3: string;
        modifytime: number;
    }[];
}

export type OddsRunningHashTable = Record<
    number,
    Record<
        number,
        {
            handicapHalf?: BettingData;
            handicap?: BettingData;
            overUnderHalf?: BettingData;
            overUnder?: BettingData;
        }
    >
>;

interface BettingData {
    id: number;
    matchId: number;
    time: string;
    homeScore: number;
    awayScore: number;
    type: number;
    companyId: number;
    homeCurrentOdds?: number;
    currentHandicap: number;
    awayCurrentOdds?: number;
    currentOverOdds?: number;
    currentUnderOdds?: number;
    modifytime: number;
    isClosed: boolean;
}

function createOddRunningHashTable(oddList: OddsRunningType) {
    const result: OddsRunningHashTable = {};

    oddList.list?.forEach(item => {
        if (item.type !== 1 && item.type !== 2 && item.type !== 6 && item.type !== 7) {
            return;
        }

        if (!result[item.matchId] as boolean) {
            result[item.matchId] = {};
        }

        if (!result[item.matchId][item.companyId] as boolean) {
            result[item.matchId][item.companyId] = {};
        }

        const bettingData: BettingData = {
            id: item.id,
            matchId: item.matchId,
            time: item.time,
            homeScore: item.homeScore,
            awayScore: item.awayScore,
            type: item.type,
            companyId: item.companyId,
            homeCurrentOdds: parseFloat(item.odds1),
            currentHandicap: parseFloat(item.odds2),
            awayCurrentOdds: parseFloat(item.odds3),
            modifytime: item.modifytime,
            isClosed: item.type === 6 || item.type === 7
        };

        if (item.type === 1 || item.type === 6) {
            const key = oddList.isHalf ? 'handicapHalf' : 'handicap';
            result[item.matchId][item.companyId][key] = bettingData;
        } else {
            bettingData.currentOverOdds = parseFloat(item.odds1);
            bettingData.currentUnderOdds = parseFloat(item.odds3);
            const key = oddList.isHalf ? 'overUnderHalf' : 'overUnder';
            result[item.matchId][item.companyId][key] = bettingData;
        }
    });

    return result;
}

const handleOddRunningMessage = async (message: Buffer) => {
    const messageObject = await deProtoOddRunning(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useOddsRunningQueue) {
        const formatDecodedMessage = createOddRunningHashTable({
            ...decodedMessage,
            isHalf: false
        });
        messageMethod(formatDecodedMessage);
    }

    // console.log('[MQTT On Odd Running message ContestMessage]: ', decodedMessage);
};

const handleOddRunningHalfMessage = async (message: Buffer) => {
    const messageObject = await deProtoOddRunningHalf(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useOddsRunningHalfQueue) {
        const formatDecodedMessage = createOddRunningHashTable({ ...decodedMessage, isHalf: true });
        messageMethod(formatDecodedMessage);
    }

    // eslint-disable-next-line no-console -- Check mqtt message
    console.log('[MQTT On Odd Running Half message ContestMessage]: ', decodedMessage);
};

export const mqttService = {
    init: () => {
        if (init) {
            client = mqtt.connect(`${process.env.NEXT_PUBLIC_MQTT_PATH}`);
            client.on('connect', () => {
                // eslint-disable-next-line no-console -- Check lifecycle
                console.log('Mqtt connected');
                client.subscribe('updatematch');
                client.subscribe('updateasia_odds');
                client.subscribe('updateasia_odds_change');
                client.subscribe('updateevent');
                client.subscribe('updatetechnic');
                client.subscribe('analytical/analysis');
            });
            client.on('message', (topic, message) => {
                if (topic === 'updatematch') void handleContestMessage(message);
                if (topic === 'updateasia_odds') void handleOddsMessage(message);
                if (topic === 'updateasia_odds_change') void handleOddsChangeMessage(message);
                if (topic === 'updateevent') void handleDetailEventMessage(message);
                if (topic === 'updatetechnic') void handleDetailTechnicListMessage(message);
                if (topic === 'analytical/analysis') void handleAnalysisMessage(message);
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
            client.subscribe('updateodds_running_half');

            client.on('message', (topic, message) => {
                if (topic === 'updateodds_running') void handleOddRunningMessage(message);
                if (topic === 'updateodds_running_half') void handleOddRunningHalfMessage(message);
            });
        } else {
            isConnect = true;
        }
    },
    oddRunningDeinit: () => {
        // eslint-disable-next-line no-console -- Check lifecycle
        console.log('Mqtt oddRunning deinit');
        client.unsubscribe('updateodds_running');
        client.unsubscribe('updateodds_running_half');
    },
    getMessage: (onMessage: (data: OriginalContestInfo) => void) => {
        useMessageQueue.push(onMessage);
    },
    getOdds: (onMessage: (data: OddsType) => void) => {
        useOddsQueue.push(onMessage);
    },
    getOddsChange: (onMessage: (data: OddChangeType) => void) => {
        useOddsChangeQueue.push(onMessage);
    },
    getTechnicList: (onMessage: (data: TechnicalInfoData) => void) => {
        useTechnicalQueue.push(onMessage);
    },
    getEventList: (onMessage: (data: EventInfoData) => void) => {
        useEventQueue.push(onMessage);
    },
    getOddsRunning: (onMessage: (data: OddsRunningHashTable) => void) => {
        useOddsRunningQueue.push(onMessage);
    },
    getOddsRunningHalf: (onMessage: (data: OddsRunningHashTable) => void) => {
        useOddsRunningHalfQueue.push(onMessage);
    },
    getAnalysis: (onMessage: (data: AnalysisResponse) => void) => {
        useAnalysisQueue.push(onMessage);
    },
    publishAnalysis: (data: AnalysisRequest) => {
        if (!init) {
            client.publish('analytical/analysis', JSON.stringify(data), { qos: 2 }, error => {
                if (error) {
                    console.error(error);
                } else {
                    // eslint-disable-next-line -- success console
                    console.log('Success Published');
                }
            });
        } else {
            // eslint-disable-next-line -- error console
            console.log('mqtt not init');
        }
    }
};
