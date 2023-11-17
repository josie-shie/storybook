import type { Root, Type } from 'protobufjs';
import { load } from 'protobufjs';

let changeProtobuf: Root;
let changeItem: Type;
let changeInit = true;

let oddsProtobuf: Root;
let oddsItem: Type;
let oddsInit = true;

let oddsChangeProtobuf: Root;
let oddsChangeItem: Type;
let oddsChangeInit = true;

let eventProtobuf: Root;
let eventItem: Type;
let eventInit = true;

let technicProtobuf: Root;
let technicItem: Type;
let technicInit = true;

let oddsRunningProtobuf: Root;
let oddsRunningItem: Type;
let oddsRunningInit = true;

let oddsRunningHalfProtobuf: Root;
let oddsRunningHalfItem: Type;
let oddsRunningHalfInit = true;

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
    if (oddsInit) {
        oddsProtobuf = await load('/odds.proto');
        oddsItem = oddsProtobuf.lookupType('dataFetcher.AsiaMatchOdds');
        oddsInit = false;
    }

    const decoded = oddsItem.decode(msg);
    return decoded;
};

export const deProtoOddsChange = async (msg: Uint8Array) => {
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

export const deProtoOddRunning = async (msg: Uint8Array) => {
    if (oddsRunningInit) {
        oddsRunningProtobuf = await load('/odds_running.proto');
        oddsRunningItem = oddsRunningProtobuf.lookupType('dataFetcher.OddsRunningMap');
        oddsRunningInit = false;
    }

    const decoded = oddsRunningItem.decode(msg);
    return decoded;
};

export const deProtoOddRunningHalf = async (msg: Uint8Array) => {
    if (oddsRunningHalfInit) {
        oddsRunningHalfProtobuf = await load('/odds_running_half.proto');
        oddsRunningHalfItem = oddsRunningHalfProtobuf.lookupType('dataFetcher.OddsRunningHalfList');
        oddsRunningHalfInit = false;
    }

    const decoded = oddsRunningHalfItem.decode(msg);
    return decoded;
};
