import dayjs from 'dayjs';
import Select from '@/app/football/[matchId]/(dashboard)/components/select/select';
import type {
    BattleRecord,
    WinLoseResultProps,
    GameTimeProps,
    OddsDetailResultProps,
    FilterProps
} from '@/types/analyze';
import TableSkeleton from '../tableSkeleton/tableSkeleton';
import style from './record.module.scss';

const contestTimeList = [
    { label: '全场', value: 'full' },
    { label: '半场', value: 'half' }
];

const WinLoseResultStyle = {
    win: style.colorRed,
    lose: style.colorGreen,
    draw: style.colorBlue
};

function formatFloatingPoint(target: number, num: number) {
    return Math.floor(target * Math.pow(10, num)) / Math.pow(10, num);
}

function EmptyTableDetail({ loading }: { loading: boolean }) {
    return loading ? (
        <TableSkeleton rowNumber={11} />
    ) : (
        <div className="tr" key="default">
            <div className="td">-</div>
            <div className="td">-</div>
            <div className="td">-</div>
            <div className="td">-</div>
            <div className="td">-</div>
        </div>
    );
}

interface PropsType {
    list: BattleRecord[];
    winLoseResult: WinLoseResultProps;
    oddsDetailResult: OddsDetailResultProps;
    contestTime: GameTimeProps;
    loading: boolean;
    setContestTime: (value: GameTimeProps) => void;
    handleFilterList: (value: FilterProps) => void;
}

function TableDetail({
    list = [],
    winLoseResult,
    oddsDetailResult,
    contestTime,
    loading,
    setContestTime,
    handleFilterList
}: PropsType) {
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

    return (
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
                            <div className={style.dateText}>
                                {dayjs(item.matchTime).format('YY-MM-DD')}
                            </div>
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
                                <span>({item.homeHalfScore}</span>-
                                <span>{item.awayHalfScore})</span>
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
                                    handleOddsText({ handicap: item.handicapType }).style.handicap
                                }`}
                            >
                                <div className={style.textAlign}>
                                    {convertValue(Number(item.handicap)) || '-'}
                                </div>
                                <div className={style.textAlign}>
                                    {item.matchId
                                        ? handleOddsText({ handicap: item.handicapType }).text
                                              .handicap
                                        : '-'}
                                </div>
                            </div>
                            <div
                                className={`${
                                    item.matchId
                                        ? handleOddsText({ overUnder: item.overType }).style.over
                                        : ''
                                }`}
                            >
                                <div className={style.textAlign}>
                                    {formatFloatingPoint(Number(item.overUnder), 2) || '-'}
                                </div>
                                <div className={style.textAlign}>
                                    {item.matchId
                                        ? handleOddsText({ overUnder: item.overType }).text.over
                                        : '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <EmptyTableDetail loading={loading} />
            )}
            {list.length > 0 && (
                <div
                    className={style.trResult}
                    key="result"
                    style={{
                        backgroundColor: '#fff',
                        borderBottom: '1px solid #f3f3f3',
                        borderRight: '1px solid #f3f3f3'
                    }}
                >
                    <div>{`近${list.length}场：`}</div>
                    <div className={style.colorRed}>{`${winLoseResult.win}胜`}</div>
                    <div className={style.colorBlue}>{`${winLoseResult.tie}平`}</div>
                    <div className={style.colorGreen}>{`${winLoseResult.lose}负`}</div>
                    <div className={style.spanGap}>
                        <span>胜率</span>
                        <span className={style.colorRed}>{`${winLoseResult.winRate}%`}</span>
                    </div>
                    <div className={style.spanGap}>
                        <span>赢率</span>
                        <span className={style.colorRed}>{`${
                            oddsDetailResult.winRate || '-'
                        }%`}</span>
                    </div>
                    <div className={style.spanGap}>
                        <span>大率</span>
                        <span className={style.colorRed}>{`${
                            oddsDetailResult.overRate || '-'
                        }%`}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TableDetail;
