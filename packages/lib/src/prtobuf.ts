import type { Root, Type } from 'protobufjs';
import { load } from 'protobufjs';

let changeProtobuf: Root;
let changeItem: Type;
let changeInit = true;

let oddsChangeProtobuf: Root;
let oddsChangeItem: Type;
let oddsChangeInit = true;

let eventProtobuf: Root;
let eventItem: Type;
let eventInit = true;

let technicProtobuf: Root;
let technicItem: Type;
let technicInit = true;

/**
 * toProto method
 *
 * const message = changeItem.create(msg);
 * const buffer = changeItem.encode(message).finish();
 *
 */

export const deProto = async (msg: Uint8Array) => {
    if (changeInit) {
        changeProtobuf = await load('/change.proto');
        changeItem = changeProtobuf.lookupType('dataFetcher.ChangeItem');
        changeInit = false;
    }

    const decoded = changeItem.decode(msg);
    return decoded;
};

export const deProtoOdds = async (msg: Uint8Array) => {
    if (oddsChangeInit) {
        oddsChangeProtobuf = await load('/odds_change.proto');
        oddsChangeItem = oddsChangeProtobuf.lookupType('dataFetcher.AsiaMatchOddsChange');
        oddsChangeInit = false;
    }

    const decoded = oddsChangeItem.decode(msg);
    return decoded;
};

export const deProtoDetailEvent = async (msg: Uint8Array) => {
    if (eventInit) {
        eventProtobuf = await load('/detail.proto');
        eventItem = eventProtobuf.lookupType('dataFetcher.EventList');
        eventInit = false;
    }

    const decoded = eventItem.decode(msg);
    return decoded;
};

export const deProtoDetailTechnicList = async (msg: Uint8Array) => {
    if (technicInit) {
        technicProtobuf = await load('/detail.proto');
        technicItem = technicProtobuf.lookupType('dataFetcher.TechnicConvertList');
        technicInit = false;
    }

    const decoded = technicItem.decode(msg);
    return decoded;
};
