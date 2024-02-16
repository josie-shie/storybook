import type { MqttClient } from 'mqtt';
import * as mqtt from 'mqtt';
import { getRandomInt } from './random';
import type {
    NotifyMessage,
    OriginalContestInfo,
    TechnicalInfoData,
    EventInfo,
    TextLive,
    TextLiveRequest,
    TextLiveResponse,
    OddsRunningType
} from './type';

let client: MqttClient;
let isConnect = false;

const useMessageQueue: ((data: OriginalContestInfo) => void)[] = [];
const useEventQueue: ((data: EventInfo) => void)[] = [];
const useTextLiveQueue: ((data: TextLiveResponse) => void)[] = [];
const useTechnicalQueue: ((data: TechnicalInfoData) => void)[] = [];
const useOddsRunningQueue: ((data: OddsRunningType) => void)[] = [];
const usedNotifyMessageQueue: ((data: NotifyMessage) => void)[] = [];

let init = true;
const textDecoder = new TextDecoder();

const processMessage = <T>(message: Buffer, queue: ((data: T) => void)[]) => {
    const messageObject: T = JSON.parse(textDecoder.decode(message)) as T;

    queue.forEach(handler => {
        handler(messageObject);
    });
};

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
                client.subscribe('updatematch'); // 賽事變化
                client.subscribe('updateevent'); // 賽事詳情 - 重要事件
                client.subscribe('updatetext_live'); // 賽事詳情 - 文字直播
                client.subscribe(`sport/user_notify/${memberId}`); // 全站通知
                client.subscribe('updateodds_running'); //賽事詳情 - 指數賠率變化
                // client.subscribe('updatetechnic'); 技術統計 暫不做
            });

            client.on('message', (topic, message) => {
                if (topic === 'updatematch')
                    processMessage<OriginalContestInfo>(message, useMessageQueue);
                if (topic === `sport/user_notify/${memberId}`)
                    processMessage<NotifyMessage>(message, usedNotifyMessageQueue);
                if (topic === 'updateodds_running')
                    processMessage<OddsRunningType>(message, useOddsRunningQueue);

                if (topic === 'updateevent') handleDetailEventMessage(message);
                if (topic === 'updatetext_live') handleDetailTextLiveMessage(message);

                if (topic === 'updatetechnic')
                    processMessage<TechnicalInfoData>(message, useTechnicalQueue);
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
                if (topic === 'updateodds_running')
                    processMessage<OddsRunningType>(message, useOddsRunningQueue);
            });
        } else {
            isConnect = true;
        }
    },
    oddRunningDeInit: () => {
        // eslint-disable-next-line no-console -- Check lifecycle
        console.log('Mqtt oddRunning deInit');
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
