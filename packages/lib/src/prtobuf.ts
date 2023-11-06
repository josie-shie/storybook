import type { Root, Type } from 'protobufjs';
import { load } from 'protobufjs';

let protobuf: Root;
let changeItem: Type;
let init = true;

/**
 * toProto method
 *
 * const message = changeItem.create(msg);
 * const buffer = changeItem.encode(message).finish();
 *
 */

export const deProto = async (msg: Uint8Array) => {
    if (init) {
        protobuf = await load('/change.proto');
        changeItem = protobuf.lookupType('dataFetcher.ChangeItem');
        init = false;
    }
    const decoded = changeItem.decode(msg);
    return decoded;
};

export const deProtoOdds = async (msg: Uint8Array) => {
    if (init) {
        protobuf = await load('/odds_change.proto');
        changeItem = protobuf.lookupType('dataFetcher.AsiaMatchOddsChange');
        init = false;
    }

    const decoded = changeItem.decode(msg);
    return decoded;
};

export const deProtoDetail = async (msg: Uint8Array, event: string) => {
    if (init) {
        protobuf = await load('/detail.proto');
        changeItem = protobuf.lookupType(`dataFetcher.${event}`);
        init = false;
    }
    const decoded = changeItem.decode(msg);
    return decoded;
};
