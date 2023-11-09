import type { MqttClient } from 'mqtt';
import * as mqtt from 'mqtt';
import { deProto, deProtoOdds, deProtoDetailEvent, deProtoDetailTechnicList } from './prtobuf';

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

interface EventInfoData {
    matchId: number;
    event: {
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
    }[];
}

let client: MqttClient;
const useMessageQueue: ((data: OriginalContestInfo) => void)[] = [];
const useOddsQueue: ((data: OriginalContestInfo) => void)[] = [];
const useTechnicalQueue: ((data: TechnicalInfoData) => void)[] = [];
const useEventQueue: ((data: EventInfoData) => void)[] = [];
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

    // eslint-disable-next-line no-console -- Check mqtt message
    console.log('[MQTT On contest message]: ', decodedMessage);
};

const handleOddsMessage = async (message: Buffer) => {
    const messageObject = await deProtoOdds(message);
    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );
    for (const messageMethod of useOddsQueue) {
        messageMethod(decodedMessage as unknown as OriginalContestInfo);
    }
    // eslint-disable-next-line no-console -- Check mqtt message
    console.log('[MQTT On odds message]: ', decodedMessage);
};

const handleDetailEventMessage = async (message: Buffer) => {
    const messageObject = await deProtoDetailEvent(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useEventQueue) {
        messageMethod(decodedMessage as unknown as EventInfoData);
    }

    // eslint-disable-next-line no-console -- Check mqtt message
    console.log(`[MQTT On detail EventList message]: `, decodedMessage);
};

const handleDetailTechnicListMessage = async (message: Buffer) => {
    const messageObject = await deProtoDetailTechnicList(message);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useTechnicalQueue) {
        messageMethod(decodedMessage as unknown as TechnicalInfoData);
    }

    // eslint-disable-next-line no-console -- Check mqtt message
    console.log(`[MQTT On detail TechnicList message]: `, decodedMessage);
};

export const mqttService = {
    init: () => {
        if (init) {
            client = mqtt.connect(`${process.env.NEXT_PUBLIC_MQTT_PATH}`);
            client.on('connect', () => {
                // eslint-disable-next-line no-console -- Check lifecycle
                console.log('Mqtt connected');
                client.subscribe('updatematch');
                client.subscribe('updateasia_odds_change');
                client.subscribe('updateevent');
                client.subscribe('updatetechnic');
            });
            client.on('message', (topic, message) => {
                if (topic === 'updatematch') void handleContestMessage(message);
                if (topic === 'updateasia_odds_change') void handleOddsMessage(message);
                if (topic === 'updateevent') void handleDetailEventMessage(message);
                if (topic === 'updatetechnic') void handleDetailTechnicListMessage(message);
            });
            init = false;
        }
        return client;
    },
    getMessage: (onMessage: (data: OriginalContestInfo) => void) => {
        useMessageQueue.push(onMessage);
    },
    getOdds: (onMessage: (data: OriginalContestInfo) => void) => {
        useOddsQueue.push(onMessage);
    },
    getTechnicList: (onMessage: (data: TechnicalInfoData) => void) => {
        useTechnicalQueue.push(onMessage);
    },
    getEventList: (onMessage: (data: EventInfoData) => void) => {
        useEventQueue.push(onMessage);
    }
};
