import { pinyin } from 'pinyin-pro';

export interface ContestInfoType {
    leagueChsShort: string;
    countryCn: string;
}

export interface FilterMap {
    infoObj: Record<string, string[]>;
    countMap: Record<string, number>;
}

export type FilterInfo = Record<string, ContestInfoType>;

type ContestArr = { title: string; list: string[] }[];

export const formatFilterMap = (currentInfo: FilterInfo, filterKey: keyof ContestInfoType) => {
    const infoObj: FilterMap['infoObj'] = {};
    const countMap: FilterMap['countMap'] = {};
    const doubleTable: Record<string, boolean> = {};

    for (const key in currentInfo) {
        const value = currentInfo[key];
        const filterValue = value[filterKey];

        if (!filterValue) continue;

        const words: string = pinyin(filterValue, {
            toneType: 'none'
        })[0].toUpperCase();

        if (countMap[filterValue]) {
            countMap[filterValue] += 1;
        } else {
            countMap[filterValue] = 1;
        }

        if (doubleTable[value[filterKey]]) {
            continue;
        } else {
            doubleTable[value[filterKey]] = true;
        }

        const newObj = filterValue;

        if (Object.hasOwnProperty.call(infoObj, words)) {
            infoObj[words].push(newObj);
        } else {
            infoObj[words] = [newObj];
        }
    }

    return { infoObj, countMap };
};

export const formatContestMap = (currentInfo: FilterInfo, filterKey: keyof ContestInfoType) => {
    const { infoObj } = formatFilterMap(currentInfo, filterKey);
    const newArr: ContestArr = [];
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        const word = String.fromCharCode(i);
        if (!Object.hasOwnProperty.call(infoObj, word)) continue;
        newArr.push({
            title: word,
            list: infoObj[word]
        });
    }
    return newArr;
};
