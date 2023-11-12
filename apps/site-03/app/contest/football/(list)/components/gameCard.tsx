import type { ContestInfo } from 'data-center';
import Image from 'next/image';
import { GameStatus } from 'ui';
import { parseMatchInfo, timestampToString } from 'lib';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useContestListStore } from '../contestListStore';
import style from './gameCard.module.scss';
import Flag from './img/flag.png';
import { useContestInfoStore } from '@/app/contestInfoStore';

function ExtraInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    if (!syncData.extraExplain && !contestInfo.extraExplain) return null;

    const extraObj = parseMatchInfo(syncData.extraExplain || contestInfo.extraExplain);

    return (
        <div className={style.extraInfo}>
            {extraObj.regularTime?.minutes ? `${extraObj.regularTime.minutes} 分鐘` : ''} [
            {extraObj.regularTime?.score}]{' '}
            {extraObj.extraTime?.type ? `${extraObj.extraTime.type},` : ''}
            {extraObj.extraTime?.score ? `, 現在比分[${extraObj.extraTime.score}]` : ''}
        </div>
    );
}

const convertStringToNumber = (input: string): number => {
    if (input.includes('/')) {
        const parts = input.split('/').map(Number);
        return (parts[0] + parts[1]) / 2;
    }
    return Number(input);
};

const compareNumbers = (previous: number, current: number): string => {
    if (current > previous) {
        return 'greater';
    } else if (current < previous) {
        return 'lesser';
    }
    return 'equal';
};

export function CompareOdds({
    value,
    defaultColor = ''
}: {
    value: string | number;
    defaultColor?: string;
}) {
    const [previousValue, setPreviousValue] = useState(value);
    const [color, setColor] = useState(defaultColor);

    const stringCompare = useCallback((previous: string, current: string): string => {
        const previousNumber = convertStringToNumber(previous);
        const currentNumber = convertStringToNumber(current);

        return compareNumbers(previousNumber, currentNumber);
    }, []);

    const setStyleBasedOnComparison = useCallback(
        (comparisonResult: string) => {
            switch (comparisonResult) {
                case 'greater':
                    setColor('red');
                    break;
                case 'lesser':
                    setColor('green');
                    break;
                case 'equal':
                    setColor(defaultColor);
                    break;
                default:
                    setColor('');
            }
        },
        [defaultColor]
    );

    useEffect(() => {
        if (previousValue === value) {
            return;
        }
        if (typeof value === 'string' && typeof previousValue === 'string') {
            const result = stringCompare(previousValue, value);
            setStyleBasedOnComparison(result);
        } else if (typeof value === 'number' && typeof previousValue === 'number') {
            const result = compareNumbers(previousValue, value);
            setStyleBasedOnComparison(result);
        }
        setPreviousValue(value);
    }, [value, previousValue, stringCompare, setStyleBasedOnComparison]);

    return <p className={style[color]}>{value}</p>;
}

function OddsInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    return (
        <div className={style.oddsInfo}>
            {syncData.handicapHomeCurrentOdds ||
            syncData.handicapAwayCurrentOdds ||
            contestInfo.handicapHomeCurrentOdds ||
            contestInfo.handicapAwayCurrentOdds ? (
                <span className={`${style.odd} ${style.left}`}>
                    <CompareOdds
                        value={
                            syncData.handicapHomeCurrentOdds || contestInfo.handicapHomeCurrentOdds
                        }
                    />
                    <CompareOdds
                        defaultColor="blue"
                        value={syncData.handicapCurrent || contestInfo.handicapCurrent}
                    />
                    <CompareOdds
                        value={
                            syncData.handicapAwayCurrentOdds || contestInfo.handicapAwayCurrentOdds
                        }
                    />
                </span>
            ) : null}
            <span className={style.mid}>
                <p>
                    {(syncData.state || contestInfo.state) >= 1 &&
                    (syncData.state || contestInfo.state) <= 5 ? (
                        <>
                            {syncData.homeHalfScore || contestInfo.homeHalfScore} -{' '}
                            {syncData.awayHalfScore || contestInfo.awayHalfScore}
                        </>
                    ) : null}
                </p>
            </span>
            {syncData.overUnderUnderCurrentOdds ||
            syncData.overUnderOverCurrentOdds ||
            contestInfo.overUnderUnderCurrentOdds ||
            contestInfo.overUnderOverCurrentOdds ? (
                <span className={style.odd}>
                    <CompareOdds
                        value={
                            syncData.overUnderUnderCurrentOdds ||
                            contestInfo.overUnderUnderCurrentOdds
                        }
                    />
                    <CompareOdds
                        defaultColor="blue"
                        value={syncData.overUnderCurrent || contestInfo.overUnderCurrent}
                    />
                    <CompareOdds
                        value={
                            syncData.overUnderOverCurrentOdds ||
                            contestInfo.overUnderOverCurrentOdds
                        }
                    />
                </span>
            ) : null}
        </div>
    );
}

function TeamInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    // if (syncData.matchId)

    // console.log(syncData, contestInfo.awayChs, contestInfo.homeChs, '此賽事更新');

    return (
        <div className={style.teamInfo}>
            <div className={`${style.homeTeam} ${style.team}`}>
                <div className={style.cards}>
                    {(syncData.homeRed && syncData.homeRed > 0) || contestInfo.homeRed > 0 ? (
                        <p className={`${style.redCard} ${style.card}`}>
                            {syncData.homeRed || contestInfo.homeRed}
                        </p>
                    ) : null}
                    {(syncData.homeYellow && syncData.homeYellow > 0) ||
                    contestInfo.homeYellow > 0 ? (
                        <p className={`${style.yellowCard} ${style.card}`}>
                            {syncData.homeYellow || contestInfo.homeYellow}
                        </p>
                    ) : null}
                </div>
                {contestInfo.homeChs}
            </div>
            <div className={style.score}>
                {(syncData.state || contestInfo.state) >= 1 &&
                (syncData.state || contestInfo.state) <= 5 ? (
                    <>
                        {syncData.homeScore || contestInfo.homeScore} -{' '}
                        {syncData.awayScore || contestInfo.awayScore}
                    </>
                ) : (
                    '-'
                )}
            </div>
            <div className={`${style.awayTeam} ${style.team}`}>
                {contestInfo.awayChs}
                <div className={style.cards}>
                    {(syncData.awayRed && syncData.awayRed > 0) || contestInfo.awayRed > 0 ? (
                        <p className={`${style.redCard} ${style.card}`}>
                            {syncData.awayRed || contestInfo.awayRed}
                        </p>
                    ) : null}
                    {(syncData.awayYellow && syncData.awayYellow > 0) ||
                    contestInfo.awayYellow > 0 ? (
                        <p className={`${style.yellowCard} ${style.card}`}>
                            {syncData.awayYellow || contestInfo.awayYellow}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function TopArea({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div className={style.league} style={{ color: contestInfo.color }}>
                    {contestInfo.leagueChsShort}
                </div>
                <div className={style.time}>
                    {contestInfo.matchTime
                        ? timestampToString(contestInfo.matchTime, 'HH:mm')
                        : null}
                </div>
            </div>
            <div className={style.mid}>
                <div className={style.corner}>
                    <Image alt="flag" height={12} src={Flag.src} width={12} />{' '}
                    <span className={style.ratio}>
                        {syncData.homeCorner || contestInfo.homeCorner}
                    </span>
                </div>
                <div className={style.status}>
                    <GameStatus
                        injuryTime={syncData.injuryTime || contestInfo.injuryTime}
                        startTime={contestInfo.startTime}
                        status={syncData.state || contestInfo.state}
                    />
                </div>
                <div className={style.corner}>
                    <Image alt="flag" height={12} src={Flag.src} width={12} />{' '}
                    <span className={style.ratio}>
                        {syncData.awayCorner || contestInfo.awayCorner}
                    </span>
                </div>
            </div>
            <div className={style.video} />
        </div>
    );
}

function GameCard({ matchId }: { matchId: number }) {
    const contestInfo = useContestListStore.use.contestInfo()[matchId];

    return (
        <li className={style.gameCard}>
            <Link href={`/contest/football/${matchId}`}>
                <div>
                    <TopArea contestInfo={contestInfo} matchId={matchId} />
                    <TeamInfo contestInfo={contestInfo} matchId={matchId} />
                    <OddsInfo contestInfo={contestInfo} matchId={matchId} />
                    <ExtraInfo contestInfo={contestInfo} matchId={matchId} />
                </div>
            </Link>
        </li>
    );
}

export default GameCard;
