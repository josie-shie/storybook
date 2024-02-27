'use client';
import Image from 'next/image';
import { useState } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { timestampToString } from 'lib';
import Link from 'next/link';
import NoData from '@/components/baseNoData/noData';
import { useLongDragonStore } from './longDragonStore';
import defaultIcon from './img/defaultIcon.png';
import iconHot from './img/hot.png';
import style from './handicapTip.module.scss';

interface RenderTeamProp {
    longOddsType: string;
    longOddsTimes: number;
    teamLogo: string;
    teamChs: string;
}

function HandicapTips({ activeFilters }: { activeFilters: string[] }) {
    const setShowLongDragon = useLongDragonStore.use.setShowLongDragon();
    const [rows, setRows] = useState({ full: 20, notYet: 0, finish: 0 });
    const handicapTips = useLongDragonStore.use.handicapTips();

    const filterMatches = (matches: typeof handicapTips) => {
        if (activeFilters.length === 0) {
            return matches;
        }
        return matches.filter(match => {
            return activeFilters.some(filter => {
                if (filter === '3rd') return match.longOddsTimes === 3;
                if (filter === '4rd') return match.longOddsTimes === 4;
                if (filter === '4rdUp') return match.longOddsTimes > 4;
                if (filter === 'hot') return match.leagueLevel >= 1 && match.leagueLevel <= 100;
                return false;
            });
        });
    };

    const displayList = filterMatches(handicapTips);

    const scrollList = displayList.slice(0, rows.full);

    if (displayList.length < 20 && rows.notYet < 10) {
        setRows(prevRows => ({
            ...prevRows,
            notYet: prevRows.notYet + 20
        }));
    }

    const loadMoreList = () => {
        if (rows.full < displayList.length) {
            setRows(prevRows => ({
                ...prevRows,
                full: prevRows.full + 20
            }));
        }
    };

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
                    <span className={style.text}>{teamChs}</span>
                </div>
                {isActiveRed || isActiveGreen ? <div className={tagStyle}>{oddsText}</div> : null}
            </div>
        );
    };

    return (
        <>
            {scrollList.length ? (
                <>
                    {scrollList.map(item => (
                        <Link
                            className={style.handicapTips}
                            href={`/football/${item.matchId}`}
                            key={`${item.longOddsTeamId}-${item.matchId}`}
                            onClick={() => {
                                setShowLongDragon(false);
                            }}
                        >
                            <div className={style.title}>
                                <div className={style.league}>
                                    <div className={style.name} style={{ color: item.color }}>
                                        {item.leagueChsShort}
                                    </div>
                                    <div className={style.time}>
                                        {timestampToString(item.startTime, 'MM-DD HH:mm')}
                                    </div>
                                    <div className={style.team}>
                                        {item.homeChs}vs{item.awayChs}
                                    </div>
                                </div>
                                <div className={style.play}>
                                    {item.leagueLevel >= 1 && item.leagueLevel <= 10 ? (
                                        <div className={style.hot}>
                                            <Image alt="" className={style.image} src={iconHot} />
                                            <span>热</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={style.content}>
                                {item.longOddsTeamId === item.homeId &&
                                    renderTeam(
                                        {
                                            longOddsType: item.longOddsType,
                                            longOddsTimes: item.longOddsTimes,
                                            teamLogo: item.homeLogo,
                                            teamChs: item.homeChs
                                        },
                                        item.longOddsTeamId === item.homeId
                                    )}
                                {item.longOddsTeamId === item.awayId &&
                                    renderTeam(
                                        {
                                            longOddsType: item.longOddsType,
                                            longOddsTimes: item.longOddsTimes,
                                            teamLogo: item.awayLogo,
                                            teamChs: item.awayChs
                                        },
                                        item.longOddsTeamId === item.awayId
                                    )}
                            </div>
                        </Link>
                    ))}
                    {rows.full < scrollList.length ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div className={style.listEnd}>
                            <p>已滑到底啰</p>
                        </div>
                    )}
                </>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default HandicapTips;
