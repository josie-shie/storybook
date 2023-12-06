import type { Root, Type } from 'protobufjs';
import { load } from 'protobufjs';

export interface User {
    avatar: string;
    name: string;
    uid: string;
}

export interface Message {
    messageId?: string;
    content?: string;
    date?: string;
    status?: string;
    emoticon?: string;
    images?: string;
    file?: File;
}

export interface MessageItem {
    content: string;
    date: string;
    messageId: string;
    status: string;
    user: User;
}
export interface MessageResponse {
    action?: string;
    status?: string;
    token?: string;
    correlationId?: string;
    roomId?: string;
    message?: MessageItem;
    list?: MessageItem[];
    page?: number;
    receiver?: { uid: string };
    rooms?: MessageRoomType[];
    type?: string;
}

export interface MessageRoomType {
    roomId: string;
    receiver: { uid: string };
    lastMessages: { content: string }[];
    date: string;
    user: User;
}

export interface ForbiddenWord {
    forbidden_word: string;
    replaced_word: string;
    sensitive_level: string;
}

interface Init {
    url: string;
    onOpen?: () => void;
    onResponse?: (res: Response) => void;
    onError?: (error: Event) => void;
    onClose?: (e: CloseEvent) => void;
    retry?: number;
}

let protobuf: Root;
let requestMessage: Type;
let responseMessage: Type;
let init = true;
const messageQueue: ((data: MessageResponse) => void)[] = [];
const openExecQueue: MessageResponse[] = [];

const initProto = async () => {
    protobuf = await load('/message.proto');
    requestMessage = protobuf.lookupType('sportim.MessageRequest');
    responseMessage = protobuf.lookupType('sportim.MessageResponse');
    init = false;
};

export const toProto = async (msg: MessageResponse) => {
    // eslint-disable-next-line no-console -- Check websocket message
    console.log('[WebSocket message request]:', msg);
    if (init) await initProto();
    const message = requestMessage.create(msg);
    const buffer = requestMessage.encode(message).finish();
    return buffer;
};

export const deProto = async (msg: Uint8Array) => {
    if (init) await initProto();
    const decodeMessage = responseMessage.decode(msg);
    // eslint-disable-next-line no-console -- Check websocket message
    console.log('[WebSocket message response]:', decodeMessage);
    return decodeMessage;
};

export const getMessageResponse = (getMethod: (data: MessageResponse) => void) => {
    messageQueue.push(getMethod);
};

export const cancelMessage = (onMessage: (data: MessageResponse) => void) => {
    const index = messageQueue.indexOf(onMessage);
    if (index > -1) {
        messageQueue.splice(index, 1);
    }
};

const messageService = {
    isOpen: false,
    connected: false,
    send: async (data: MessageResponse) => {
        await Promise.resolve(openExecQueue.push(data));
    },
    closeWS: () => void {}
};

let config: Init = {
    url: '',
    onOpen: () => void {},
    onResponse: () => void {},
    onError: () => void {},
    onClose: () => void {},
    retry: 0
};

function initWebSocket({
    url,
    onOpen = () => void {},
    onResponse = () => void {},
    onError = () => void {},
    onClose = () => void {},
    retry = 0
}: Init) {
    if (messageService.connected) return;
    messageService.connected = true;

    config = {
        url,
        onOpen,
        onResponse,
        onError,
        onClose,
        retry
    };

    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    messageService.send = async data => {
        if (!messageService.isOpen) {
            openExecQueue.push(data);
            initWebSocket(config);
        } else {
            ws.send(await toProto(data));
        }
    };

    messageService.closeWS = () => {
        if (!messageService.isOpen) return undefined;

        // eslint-disable-next-line no-console -- Check websocket message
        console.log('WS CLOSE');
        ws.close();
        messageService.connected = false;
        messageService.isOpen = false;
    };

    ws.onopen = async () => {
        messageService.isOpen = true;
        onOpen();

        const clearQueue = async () => {
            const promises = openExecQueue.map(async data => {
                await messageService.send(data);
            });
            await Promise.all(promises);
            openExecQueue.length = 0;
        };
        await clearQueue();
    };

    ws.onmessage = async msg => {
        if (msg.data instanceof ArrayBuffer) {
            const data = new Uint8Array(msg.data);
            try {
                const res = await deProto(data);
                onResponse(res as unknown as Response);
                for (const method of messageQueue) {
                    method(res as unknown as MessageResponse);
                }
            } catch (e) {
                // eslint-disable-next-line no-console -- Check websocket message
                console.log('ws message format error: ', e);
            }
        }
    };

    ws.onerror = error => {
        // eslint-disable-next-line no-console -- Check websocket message
        console.log('ERROR: ', error);
        messageService.connected = false;
        onError(error);
        ws.close();
    };

    ws.onclose = (e: CloseEvent) => {
        // eslint-disable-next-line no-console -- Check websocket message
        console.log('CLOSE');
        onClose(e);
        messageService.connected = false;
        messageService.isOpen = false;
    };
}

export { initWebSocket, messageService };
