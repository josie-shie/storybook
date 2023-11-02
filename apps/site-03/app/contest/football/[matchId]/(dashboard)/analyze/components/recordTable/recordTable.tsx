import { useState } from 'react';
import type { FormatRecordDataResponse } from 'data-center';
import Select from '../../../components/select/select';
import style from './record.module.scss';
import type { HandicapType, BattleRecord } from '@/types/analyze';

type GameAmountProps = 10 | 20;
type GameTypeProps = '0' | '1' | '2';
type GameCompanyProps = 'crown' | 'bet365';
const DefaultCompany = 'crown';
const DefaultHandicap = 'current';
const DefaultTime = 'full';
type GameHandicapProps = 'current' | 'initial';
type GameTimeProps = 'full' | 'half';

const WinLoseResultStyle = {
    win: style.colorRed,
    lose: style.colorGreen,
    draw: style.colorBlue
};

const contestAmountList = [
    { label: '近10场', value: 10 },
    { label: '近20场', value: 20 }
];

const contestTypeList = [
    { label: '全部赛事', value: '2' },
    { label: '联赛', value: '0' },
    { label: '杯赛', value: '1' }
];

const componyList = [
    { label: '皇*', value: 'crown' },
    { label: 'Bet*', value: 'bet365' }
];

const handicapList = [
    { label: '终', value: 'current' },
    { label: '初', value: 'initial' }
];

const contestTimeList = [
    { label: '全场', value: 'full' },
    { label: '半场', value: 'half' }
];

interface RecordTableProps {
    tableData: FormatRecordDataResponse;
    homeTeamData?: { id: number; name: string };
    mode?: 'battle' | 'one';
    showTitle?: boolean;
}

const convertValue = (input: number) => {
    const isNegative = input < 0;
    const absoluteValue = Math.abs(input);
    const floorValue = Math.floor(absoluteValue);
    const fraction = absoluteValue - floorValue;

    switch (fraction) {
        case 0.25:
            return isNegative
                ? `-${floorValue}/${floorValue + 0.5}`
                : `${floorValue}/${floorValue + 0.5}`;
        case 0.75:
            return isNegative
                ? `-${floorValue + 0.5}/${floorValue + 1}`
                : `${floorValue + 0.5}/${floorValue + 1}`;
        default:
            return input;
    }
};

function formatFloatingPoint(target: number, num: number) {
    return Math.floor(target * Math.pow(10, num)) / Math.pow(10, num);
}

function RecordTable({ tableData, mode, homeTeamData, showTitle }: RecordTableProps) {
    const [list, setList] = useState<BattleRecord[]>([]);
    const [contestAmount, setContestAmount] = useState<GameAmountProps>(10);
    const [contestType, setContestType] = useState<GameTypeProps>('2');
    const [contestCompany, setContestCompany] = useState<GameCompanyProps>(DefaultCompany);
    const [contestHandicap, setContestHandicap] = useState<GameHandicapProps>(DefaultHandicap);
    const [contestTime, setContestTime] = useState<GameTimeProps>(DefaultTime);
    const [gameIsHome, setGameIsHome] = useState(false);

    const handleOddsText = ({ handicap, overUnder }: { handicap?: string; overUnder?: string }) => {
        let handicapStyle = '';
        let handicapText = '';
        let overStyle = '';
        let overText = '';

        if (handicap === 'win') {
            handicapStyle = style.colorRed;
            handicapText = '赢';
        }

        if (handicap === 'draw') {
            handicapStyle = style.colorBlue;
            handicapText = '走';
        }

        if (handicap === 'lose') {
            handicapStyle = style.colorGreen;
            handicapText = '输';
        }

        if (overUnder === 'big') {
            overStyle = style.colorRed;
            overText = '大';
        }

        if (overUnder === 'small') {
            overStyle = style.colorGreen;
            overText = '小';
        }

        if (overUnder === 'draw') {
            overStyle = style.colorBlue;
            overText = '走';
        }

        return {
            style: {
                over: overStyle,
                handicap: handicapStyle
            },
            text: {
                over: overText,
                handicap: handicapText
            }
        };
    };

    const handleFilterList = (filterParams: {
        company?: GameCompanyProps;
        handicap?: GameHandicapProps;
        time?: GameTimeProps;
        amount?: GameAmountProps;
        type?: GameTypeProps;
    }) => {
        const prams = {
            company: contestCompany,
            handicap: contestHandicap,
            time: contestTime,
            type: contestType,
            amount: contestAmount,
            ...filterParams
        };

        const filterData = tableData[prams.company][prams.time];

        let rowData = filterData
            .filter(item => {
                if (prams.type === '2') {
                    return item;
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
        setList(rowData);
    };

    return (
        <div className={style.recordTable}>
            <div className="topBar">
                <h6 className="title">{showTitle ? '对赛往绩' : null}</h6>
            </div>
            <div className="dataTable">
                {mode === 'one' && (
                    <div>
                        <div className={style.tableHead}>
                            <div className={style.th}>
                                <div>{homeTeamData?.name}</div>
                                <div className={style.checkbox}>
                                    <input
                                        checked={gameIsHome}
                                        id="isHome"
                                        onChange={() => {
                                            setGameIsHome(!gameIsHome);
                                            // handleFilterList({ isHome: !gameIsHome });
                                        }}
                                        type="checkbox"
                                    />
                                    <label htmlFor="isHome">同主客</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">
                            <Select
                                onChange={value => {
                                    setContestAmount(value as GameAmountProps);
                                    handleFilterList({
                                        amount: value as GameAmountProps
                                    });
                                }}
                                options={contestAmountList}
                                selectedValue={contestAmount}
                            />
                        </div>
                        <div className="th">
                            <Select
                                onChange={value => {
                                    setContestType(value as GameTypeProps);
                                    handleFilterList({ type: value as GameTypeProps });
                                }}
                                options={contestTypeList}
                                selectedValue={contestType}
                            />
                        </div>
                        <div className="th">
                            <Select
                                onChange={value => {
                                    setContestCompany(value as GameCompanyProps);
                                    handleFilterList({ company: value as GameCompanyProps });
                                }}
                                options={componyList}
                                selectedValue={contestCompany}
                            />
                        </div>
                        <div className="th">
                            <Select
                                onChange={value => {
                                    setContestHandicap(value as GameHandicapProps);
                                    handleFilterList({ handicap: value as GameHandicapProps });
                                }}
                                options={handicapList}
                                selectedValue={contestHandicap}
                            />
                        </div>
                    </div>
                </div>
                <div className="tableBody">
                    <div className="tr">
                        <div className="td">日期/赛事</div>
                        <div className="td">主场</div>
                        <div className="td">比分</div>
                        <div className="td">客场</div>
                        <div className="td">
                            <Select
                                onChange={value => {
                                    setContestTime(value as GameTimeProps);
                                    handleFilterList({ time: value as GameTimeProps });
                                }}
                                options={contestTimeList}
                                selectedValue={contestTime}
                            />
                        </div>
                    </div>
                    {list.length > 0 ? (
                        list.map(item => (
                            <div className="tr" key={item.matchId}>
                                <div className={`td ${style.flexColumns}`}>
                                    <div className={style.dateText}>{item.matchTime}</div>
                                    <div>{item.leagueName}</div>
                                </div>
                                <div
                                    className={`td ${
                                        item.isHome ? WinLoseResultStyle[item.handicapType] : ''
                                    }`}
                                >
                                    {item.homeTeamName}
                                </div>
                                <div className={`td ${style.flexColumns}`}>
                                    <div className={`${WinLoseResultStyle[item.handicapType]}`}>
                                        <span>{item.homeScore}</span>-<span>{item.awayScore}</span>
                                    </div>
                                    <div className={style.halfScore}>
                                        <span>{item.homeHalfScore}</span>-
                                        <span>{item.awayHalfScore}</span>
                                    </div>
                                </div>
                                <div
                                    className={`td ${
                                        !item.isHome ? WinLoseResultStyle[item.handicapType] : ''
                                    }`}
                                >
                                    {item.awayTeamName}
                                </div>
                                <div className={`td ${style.handicapCell}`}>
                                    <div
                                        className={`${
                                            handleOddsText({ handicap: item.handicapType }).style
                                                .handicap
                                        }`}
                                    >
                                        <div className={style.textAlign}>
                                            {convertValue(Number(item.handicap)) || '-'}
                                        </div>
                                        <div className={style.textAlign}>
                                            {item.matchId
                                                ? handleOddsText({ handicap: item.handicapType })
                                                      .text.handicap
                                                : '-'}
                                        </div>
                                    </div>
                                    <div
                                        className={`${
                                            item.matchId
                                                ? handleOddsText({ overUnder: item.overType }).style
                                                      .over
                                                : ''
                                        }`}
                                    >
                                        <div className={style.textAlign}>
                                            {formatFloatingPoint(item.overUnder, 2) || '-'}
                                        </div>
                                        <div className={style.textAlign}>
                                            {item.matchId
                                                ? handleOddsText({ overUnder: item.overType }).text
                                                      .over
                                                : '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="tr" key="default">
                            <div className="td">- </div>
                            <div className="td">-</div>
                            <div className="td">-</div>
                            <div className="td">-</div>
                            <div className="td">-</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecordTable;
