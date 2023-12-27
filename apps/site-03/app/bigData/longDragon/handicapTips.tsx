'use client';
import Image from 'next/image';
import { timestampToString } from 'lib';
import NoData from '@/components/baseNoData/noData';
import { useMatchFilterStore } from '../analysis/matchFilterStore';
import { useHintsFormStore } from '../analysis/hintsFormStore';
import defaultIcon from './img/defaultIcon.png';
import iconHot from './img/hot.png';
import style from './handicapTip.module.scss';

interface RenderTeamProp {
    longOddsType: string;
    longOddsTimes: number;
    teamLogo: string;
    teamChs: string;
}

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

    const renderTeam = (team: RenderTeamProp, isHome: boolean) => {
        const { longOddsType, longOddsTimes, teamLogo, teamChs } = team;
        const isActiveRed = ['赢', '大'].includes(longOddsType) && isHome;
        const isActiveGreen = ['输', '小'].includes(longOddsType) && isHome;

        let tagStyle = '';
        if (isActiveRed) {
            tagStyle = style.redTag;
        } else if (isActiveGreen) {
            tagStyle = style.greenTag;
        }

        const oddsText = ['大', '小'].includes(longOddsType)
            ? `${longOddsType}球${longOddsTimes}连`
            : `${longOddsTimes} 连${longOddsType}`;

        return (
            <div className={style.team}>
                <div className={style.name}>
                    <Image
                        alt=""
                        className={style.image}
                        height={20}
                        src={teamLogo && teamLogo !== '0' ? teamLogo : defaultIcon}
                        width={20}
                    />
                    <span
                        className={`${style.text} ${isActiveRed ? style.redActive : ''} ${
                            isActiveGreen ? style.greenActive : ''
                        }`}
                    >
                        {teamChs}
                    </span>
                </div>
                {isActiveRed || isActiveGreen ? <div className={tagStyle}>{oddsText}</div> : null}
            </div>
        );
    };

    return (
        <>
            {displayList.length ? (
                displayList.map(item => (
                    <div
                        className={style.handicapTips}
                        key={`${item.longOddsTeamId}-${item.matchId}`}
                    >
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
                            {renderTeam(
                                {
                                    longOddsType: item.longOddsType,
                                    longOddsTimes: item.longOddsTimes,
                                    teamLogo: item.homeLogo,
                                    teamChs: item.homeChs
                                },
                                item.longOddsTeamId === item.homeId
                            )}
                            {renderTeam(
                                {
                                    longOddsType: item.longOddsType,
                                    longOddsTimes: item.longOddsTimes,
                                    teamLogo: item.awayLogo,
                                    teamChs: item.awayChs
                                },
                                item.longOddsTeamId === item.awayId
                            )}
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
