import { pinyin } from 'pinyin-pro';

export interface ContestInfoType {
    leagueChsShort: string;
    countryCn: string;
    rating?: number;
    isBJSingle?: boolean;
    isCompFoot?: boolean;
    isTradFoot?: boolean;
}

export interface FilterMap {
    infoObj: Record<string, string[]>;
    countMap: Record<string, number>;
    extraMap?: {
        hot: string[];
        firstClass: string[];
    };
}

export type FilterInfo = Record<string, ContestInfoType>;

type ContestArr = { title: string; list: string[] }[];

type ExcludeKeyType = 'all' | 'isBJSingle' | 'isCompFoot' | 'isTradFoot';

export const formatFilterMap = (
    currentInfo: FilterInfo,
    filterKey: keyof ContestInfoType,
    excludeKey?: ExcludeKeyType
) => {
    const infoObj: FilterMap['infoObj'] = {};
    const countMap: FilterMap['countMap'] = {};
    const doubleTable: Record<string, boolean> = {};
    const extraMap: FilterMap['extraMap'] = {
        hot: [],
        firstClass: []
    };

    for (const key in currentInfo) {
        const value = currentInfo[key];
        const filterValue = value[filterKey]?.toString();

        if (!filterValue) continue;

        const words: string = pinyin(filterValue, {
            toneType: 'none'
        })[0].toUpperCase();

        if (countMap[filterValue]) {
            countMap[filterValue] += 1;
        } else {
            countMap[filterValue] = 1;
        }

        if (
            typeof excludeKey !== 'undefined' &&
            excludeKey !== 'all' &&
            !currentInfo[key][excludeKey]
        ) {
            continue;
        }

        if (filterKey in value) {
            const newKey = value[filterKey];
            if (typeof newKey === 'string' || typeof newKey === 'number') {
                if (doubleTable[newKey]) {
                    continue;
                } else {
                    doubleTable[newKey] = true;
                }
            }
        }

        const newObj = filterValue;

        if (Object.hasOwnProperty.call(infoObj, words)) {
            infoObj[words].push(newObj);
        } else {
            infoObj[words] = [newObj];
        }

        if (value.rating !== undefined && value.rating <= 2) {
            if (Object.hasOwnProperty.call(extraMap, 'hot')) {
                extraMap.hot.push(newObj);
            } else {
                extraMap.hot = [newObj];
            }

            if (value.rating <= 1) {
                extraMap.firstClass.push(newObj);
            }
        }
    }

    return { infoObj, countMap, extraMap };
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

interface CountryList {
    countryId: number;
    countryName: string;
}

interface LeagueList {
    leagueId: number;
    leagueName: string;
}

interface CurrentArticleFilter {
    country: CountryList[];
    leagues: LeagueList[];
}

interface FormattedArticleFilterData {
    league: FilterMap;
    country: FilterMap;
}

export const formatArticleFilterMap = (
    currentArticleFilter: CurrentArticleFilter
): FormattedArticleFilterData => {
    const countryMap: Record<string, number> = {};
    const leaguesMap: Record<string, number> = {};

    for (const country of currentArticleFilter.country) {
        countryMap[country.countryName] = country.countryId;
    }

    for (const league of currentArticleFilter.leagues) {
        leaguesMap[league.leagueName] = league.leagueId;
    }

    const formattedCountries = currentArticleFilter.country.reduce<Record<string, string[]>>(
        (acc, country) => {
            const initial = pinyin(country.countryName, { toneType: 'none' })[0].toUpperCase();
            if (!(initial in acc)) {
                acc[initial] = [];
            }
            acc[initial].push(country.countryName);
            return acc;
        },
        {}
    );

    const formattedLeagues = currentArticleFilter.leagues.reduce<Record<string, string[]>>(
        (acc, league) => {
            const initial = pinyin(league.leagueName, { toneType: 'none' })[0].toUpperCase();
            if (!(initial in acc)) {
                acc[initial] = [];
            }
            acc[initial].push(league.leagueName);
            return acc;
        },
        {}
    );

    return {
        country: { infoObj: formattedCountries, countMap: countryMap },
        league: { infoObj: formattedLeagues, countMap: leaguesMap }
    };
};
