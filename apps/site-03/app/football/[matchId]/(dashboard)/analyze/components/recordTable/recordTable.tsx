import { useEffect } from 'react';
import type { FormatRecordDataResponse } from 'data-center';
import type {
    HandicapType,
    WinLoseResultProps,
    GameAmountProps,
    GameTypeProps,
    GameCompanyProps,
    GameHandicapProps,
    GameTimeProps,
    BattleRecord,
    OddsDetailResultProps
} from '@/types/analyze';
import style from './record.module.scss';
import SelectList from './selectList';
import TableDetail from './tableDetail';

function formatFloatingPoint(target: number, num: number) {
    return Math.floor(target * Math.pow(10, num)) / Math.pow(10, num);
}

interface RecordTableProps {
    tableData: FormatRecordDataResponse;
    teamName?: string;
    mode?: 'battle' | 'one';
    list: BattleRecord[];
    contestAmount: GameAmountProps;
    contestType: GameTypeProps;
    contestCompany: GameCompanyProps;
    contestHandicap: GameHandicapProps;
    contestTime: GameTimeProps;
    gameIsHome: boolean;
    winLoseResult: WinLoseResultProps;
    oddsDetailResult: OddsDetailResultProps;
    loading: boolean;
    setList: (list: BattleRecord[]) => void;
    setContestAmount: (contestAmount: GameAmountProps) => void;
    setContestType: (contestType: GameTypeProps) => void;
    setContestCompany: (contestCompany: GameCompanyProps) => void;
    setContestHandicap: (contestHandicap: GameHandicapProps) => void;
    setContestTime: (contestTime: GameTimeProps) => void;
    setGameIsHome: (gameIsHome: boolean) => void;
    setWinLoseResult: (winLoseResult: WinLoseResultProps) => void;
    setOddsDetailResult: (oddsDetailResult: OddsDetailResultProps) => void;
}

function RecordTable({
    tableData,
    mode,
    teamName,
    list,
    contestAmount,
    contestType,
    contestCompany,
    contestHandicap,
    contestTime,
    gameIsHome,
    winLoseResult,
    oddsDetailResult,
    loading,
    setList,
    setContestAmount,
    setContestType,
    setContestCompany,
    setContestHandicap,
    setContestTime,
    setGameIsHome,
    setWinLoseResult,
    setOddsDetailResult
}: RecordTableProps) {
    const handleFilterList = (filterParams: {
        company?: GameCompanyProps;
        handicap?: GameHandicapProps;
        time?: GameTimeProps;
        amount?: GameAmountProps;
        type?: GameTypeProps;
        isHome?: boolean;
    }) => {
        const prams = {
            company: contestCompany,
            handicap: contestHandicap,
            time: contestTime,
            type: contestType,
            amount: contestAmount,
            isHome: gameIsHome,
            ...filterParams
        };

        const filterData = tableData[prams.company][prams.time];

        let rowData = filterData
            .filter(item => {
                if (prams.type === '2') {
                    if (prams.isHome) {
                        return prams.isHome === item.isHome;
                    }

                    return item;
                }

                if (prams.isHome) {
                    return prams.type === item.leagueCup && prams.isHome === item.isHome;
                }

                return prams.type === item.leagueCup;
            })
            .map(item => {
                let handicapData: HandicapType;
                if (prams.handicap === 'current') {
                    handicapData = item.current;
                } else {
                    handicapData = item.initial;
                }

                return {
                    matchId: item.matchId,
                    matchTime: item.matchTime,
                    leagueName: item.leagueName,
                    homeTeamName: item.homeTeamName,
                    awayTeamName: item.awayTeamName,
                    homeScore: item.homeScore,
                    awayScore: item.awayScore,
                    homeHalfScore: item.homeHalfScore,
                    awayHalfScore: item.awayHalfScore,
                    winLose: item.winLose,
                    isHome: item.isHome,
                    ...handicapData
                };
            });
        rowData = rowData.slice(0, prams.amount);

        // 計算勝/平負場次、贏率
        const winLose = rowData.reduce<WinLoseResultProps>(
            (preItem, item) => {
                switch (item.winLose) {
                    case '2':
                        preItem.tie += 1;
                        break;
                    case '0':
                        if (item.isHome) {
                            preItem.win += 1;
                        } else {
                            preItem.lose += 1;
                        }
                        break;
                    case '1':
                        if (item.isHome) {
                            preItem.lose += 1;
                        } else {
                            preItem.win += 1;
                        }
                        break;
                    default:
                        return preItem;
                }
                return preItem;
            },
            {
                win: 0,
                tie: 0,
                lose: 0,
                winRate: 0
            }
        );

        winLose.winRate = formatFloatingPoint((winLose.win / rowData.length) * 100, 0);

        // 計算贏率、大率
        const oddsDetail = rowData.reduce<OddsDetailResultProps>(
            (preItem, item) => {
                switch (item.handicapType) {
                    case 'win':
                        preItem.win++;
                        break;
                }

                switch (item.overType) {
                    case 'big':
                        preItem.big++;
                        break;
                }

                return preItem;
            },
            {
                win: 0,
                big: 0,
                winRate: 0,
                overRate: 0
            }
        );

        oddsDetail.winRate = formatFloatingPoint((oddsDetail.win / rowData.length) * 100, 0);
        oddsDetail.overRate = formatFloatingPoint((oddsDetail.big / rowData.length) * 100, 0);

        setWinLoseResult(winLose);
        setOddsDetailResult(oddsDetail);
        setList(rowData);
    };

    useEffect(() => {
        handleFilterList({});
    }, []);

    return (
        <div className={style.recordTable}>
            <div className="dataTable">
                {mode === 'one' && (
                    <div className={style.teamNameHeader}>
                        <div className={`${style.teamName}`}>{loading ? null : teamName}</div>
                        <div className={style.checkbox}>
                            <input
                                checked={gameIsHome}
                                id="isHome"
                                onChange={() => {
                                    setGameIsHome(!gameIsHome);
                                    handleFilterList({ isHome: !gameIsHome });
                                }}
                                type="checkbox"
                            />
                            <label className={style.label} htmlFor="isHome">
                                同主客
                            </label>
                        </div>
                    </div>
                )}
                <SelectList
                    contestAmount={contestAmount}
                    contestCompany={contestCompany}
                    contestHandicap={contestHandicap}
                    contestType={contestType}
                    handleFilterList={handleFilterList}
                    setContestAmount={setContestAmount}
                    setContestCompany={setContestCompany}
                    setContestHandicap={setContestHandicap}
                    setContestType={setContestType}
                />
                <TableDetail
                    contestTime={contestTime}
                    handleFilterList={handleFilterList}
                    list={list}
                    loading={loading}
                    oddsDetailResult={oddsDetailResult}
                    setContestTime={setContestTime}
                    winLoseResult={winLoseResult}
                />
            </div>
        </div>
    );
}

export default RecordTable;
