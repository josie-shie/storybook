import GameStatus from './gameStatus';
import { formatFloatingPoint } from '@/app/lib/formatNum';
import { handleMatchDateTime } from '@/app/lib/gameTime';
import { useContestDetailStore } from '@/app/contest/football/[matchId]/contestDetailStore';

interface WinDrawLoseType {
    matchId: number;
    companyId: number;
    initialHomeOdds: number;
    initialDrawOdds: number;
    initialAwayOdds: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: number;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
    isClosed: number;
}

function WinLoseTable({ dataList }: { dataList?: WinDrawLoseType[] }) {
    const matchDetail = useContestDetailStore.use.matchDetail();

    return (
        <div className="dataTable">
            <div className="tableHead">
                <div className="tr">
                    <div className="th">狀態</div>
                    <div className="th">比分</div>
                    <div className="th" />
                    <div className="th">盤口</div>
                    <div className="th" />
                    <div className="th">時間</div>
                </div>
            </div>
            {dataList && dataList.length > 0 ? (
                <div className="tableBody">
                    {dataList.map(data => (
                        <div className="tr" key={data.oddsChangeTime}>
                            <div className="td">
                                <GameStatus
                                    endTime={data.oddsChangeTime.toString()}
                                    startTime={matchDetail.startTime}
                                    state={data.state}
                                />
                            </div>
                            <div className="td">
                                {data.homeScore}-{data.awayScore}
                            </div>
                            <div className="td">{formatFloatingPoint(data.currentHomeOdds, 2)}</div>
                            <div className="td">{data.currentDrawOdds}</div>
                            <div className="td">
                                <p>{formatFloatingPoint(data.currentAwayOdds, 2)}</p>
                            </div>
                            <div className="td">
                                {handleMatchDateTime(data.oddsChangeTime.toString())}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="tableBody">
                    <div className="tr">
                        <div className="td">-</div>
                        <div className="td">-</div>
                        <div className="td">-</div>
                        <div className="td">-</div>
                        <div className="td">-</div>
                        <div className="td">-</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WinLoseTable;
