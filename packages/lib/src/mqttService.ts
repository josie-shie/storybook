import type { MqttClient } from 'mqtt';
import * as mqtt from 'mqtt';
import { deProto, deProtoOdds, deProtoDetail } from './prtobuf';

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

let client: MqttClient;
const useMessageQueue: ((data: OriginalContestInfo) => void)[] = [];
const useOddsQueue: ((data: OriginalContestInfo) => void)[] = [];
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

const handleDetailMessage = async (message: Buffer, event: string) => {
    const messageObject = await deProtoDetail(message, event);

    const decodedMessage = toSerializableObject(
        messageObject as unknown as Record<string, unknown>
    );

    for (const messageMethod of useOddsQueue) {
        messageMethod(decodedMessage as unknown as OriginalContestInfo);
    }

    // eslint-disable-next-line no-console -- Check mqtt message
    console.log(`[MQTT On detail ${event} message]: `, decodedMessage);
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
            });
            client.on('message', (topic, message) => {
                if (topic === 'updatematch') void handleContestMessage(message);
                if (topic === 'updateasia_odds_change') void handleOddsMessage(message);
                if (topic === 'updateevent') void handleDetailMessage(message, 'EventList');
                if (topic === 'updatetechnic') void handleDetailMessage(message, 'TechnicList');
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
    }
};
