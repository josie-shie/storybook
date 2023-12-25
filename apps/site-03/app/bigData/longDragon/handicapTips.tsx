'use client';
import Image from 'next/image';
import { timestampToString } from 'lib';
import NoData from '@/components/baseNoData/noData';
import { useMatchFilterStore } from '../(list)/matchFilterStore';
import { useHintsFormStore } from '../(list)/hintsFormStore';
import defaultIcon from './img/defaultIcon.png';
import iconHot from './img/hot.png';
import style from './handicapTip.module.scss';

function HandicapTips({
    hintsSelectPlay,
    hintsSelectProgres,
    activeFilters
}: {
    hintsSelectPlay: string;
    hintsSelectProgres: string;
    activeFilters: string[];
}) {
    const handicapTips = useHintsFormStore.use.handicapTips();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const contestList = useMatchFilterStore.use.contestList();
    const filterList = useMatchFilterStore.use.filterList();

    const filterByStatus = (list: number[]) => {
        const filterGroup = filterList.group === 'league' ? 'leagueChsShort' : 'countryCn';
        return list.filter(item => {
            if (
                Object.keys(filterList.selectedTable).length > 0 &&
                !filterList.selectedTable[contestInfo[item][filterGroup]]
            ) {
                return false;
            }
            return item;
        });
    };

    const filterMatches = (matches: typeof handicapTips) => {
        if (activeFilters.length === 0) {
            return matches;
        }
        return matches.filter(match => {
            return activeFilters.some(filter => {
                if (filter === '3rd') return match.longOddsTimes === 3;
                if (filter === '4rd') return match.longOddsTimes === 4;
                if (filter === '4rdUp') return match.longOddsTimes > 4;
                if (filter === 'hot') return match.longOddsTimes >= 6;
                return false;
            });
        });
    };

    const currentList = filterByStatus(contestList);
    let displayList = handicapTips.filter(match => currentList.includes(match.matchId));

    displayList = filterMatches(displayList);

    const playMappings: Record<string, string> = {
        HANDICAP: '大小球',
        OVERUNDER: '让球'
    };

    const progressMappings: Record<string, string> = {
        HALF: '半场',
        FULL: '全场'
    };

    const formatPlay = (name: string) => playMappings[name];
    const formatProgress = (name: string) => progressMappings[name];

    return (
        <>
            {displayList.length ? (
                displayList.map(item => (
                    <div className={style.handicapTips} key={item.matchId}>
                        <div className={style.title}>
                            <div className={style.league}>
                                <div className={style.name}>{item.leagueChsShort}</div>
                                <div className={style.time}>
                                    {timestampToString(item.startTime, 'MM-DD HH:mm')}
                                </div>
                            </div>
                            <div className={style.play}>
                                <div className={style.tag}>
                                    {formatProgress(hintsSelectProgres)}
                                </div>
                                <div className={style.tag}>{formatPlay(hintsSelectPlay)}</div>
                                {item.longOddsTimes >= 6 && (
                                    <div className={style.hot}>
                                        <Image alt="" className={style.image} src={iconHot} />
                                        <span>热</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={style.content}>
                            <div className={style.team}>
                                <div className={style.name}>
                                    <Image
                                        alt=""
                                        className={style.image}
                                        height={20}
                                        src={
                                            item.homeLogo && item.homeLogo !== '0'
                                                ? item.homeLogo
                                                : defaultIcon
                                        }
                                        width={20}
                                    />
                                    <span
                                        className={`${style.text} ${
                                            (item.longOddsType === '赢' ||
                                                item.longOddsType === '大') &&
                                            item.longOddsTeamId === item.homeId
                                                ? style.redActive
                                                : ''
                                        } ${
                                            (item.longOddsType === '输' ||
                                                item.longOddsType === '小') &&
                                            item.longOddsTeamId === item.homeId
                                                ? style.greenActive
                                                : ''
                                        }`}
                                    >
                                        {item.homeChs}
                                    </span>
                                </div>
                                {item.longOddsType === '大' &&
                                    item.longOddsTeamId === item.homeId && (
                                        <div className={style.redTag}>
                                            {item.longOddsType}球{item.longOddsTimes}連
                                        </div>
                                    )}
                                {item.longOddsType === '赢' &&
                                    item.longOddsTeamId === item.homeId && (
                                        <div className={style.redTag}>
                                            {item.longOddsTimes} 連{item.longOddsType}
                                        </div>
                                    )}
                                {item.longOddsType === '小' &&
                                    item.longOddsTeamId === item.homeId && (
                                        <div className={style.greenTag}>
                                            {item.longOddsType}球{item.longOddsTimes}連
                                        </div>
                                    )}
                                {item.longOddsType === '输' &&
                                    item.longOddsTeamId === item.homeId && (
                                        <div className={style.greenTag}>
                                            {item.longOddsTimes} 連{item.longOddsType}
                                        </div>
                                    )}
                            </div>
                            <div className={style.team}>
                                <div className={style.name}>
                                    <Image
                                        alt=""
                                        className={style.image}
                                        height={20}
                                        src={
                                            item.awayLogo && item.awayLogo !== '0'
                                                ? item.awayLogo
                                                : defaultIcon
                                        }
                                        width={20}
                                    />
                                    <span
                                        className={`${style.text} ${
                                            (item.longOddsType === '赢' ||
                                                item.longOddsType === '大') &&
                                            item.longOddsTeamId === item.awayId
                                                ? style.redActive
                                                : ''
                                        } ${
                                            (item.longOddsType === '输' ||
                                                item.longOddsType === '小') &&
                                            item.longOddsTeamId === item.awayId
                                                ? style.greenActive
                                                : ''
                                        }`}
                                    >
                                        {item.awayChs}
                                    </span>
                                </div>
                                {item.longOddsType === '大' &&
                                    item.longOddsTeamId === item.awayId && (
                                        <div className={style.redTag}>
                                            {item.longOddsType}球{item.longOddsTimes}連
                                        </div>
                                    )}
                                {item.longOddsType === '赢' &&
                                    item.longOddsTeamId === item.awayId && (
                                        <div className={style.redTag}>
                                            {item.longOddsTimes} 連{item.longOddsType}
                                        </div>
                                    )}
                                {item.longOddsType === '小' &&
                                    item.longOddsTeamId === item.awayId && (
                                        <div className={style.greenTag}>
                                            {item.longOddsType}球{item.longOddsTimes}連
                                        </div>
                                    )}
                                {item.longOddsType === '输' &&
                                    item.longOddsTeamId === item.awayId && (
                                        <div className={style.greenTag}>
                                            {item.longOddsTimes} 連{item.longOddsType}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <NoData />
            )}
        </>
    );
}

export default HandicapTips;
