import type { HandicapsInfo } from 'data-center';
import { GameStatus } from 'ui';
import { truncateFloatingPoint, handicapToString, handleMatchDateTime } from 'lib';
import { useContestDetailStore } from '@/app/contest/football/[matchId]/contestDetailStore';

function HandicapTable({ dataList = [] }: { dataList: HandicapsInfo[] }) {
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
            {dataList.length > 0 ? (
                <div className="tableBody">
                    {dataList.map(data => (
                        <div className="tr" key={data.oddsChangeTime}>
                            <div className="td">
                                <GameStatus startTime={matchDetail.startTime} status={data.state} />
                            </div>
                            <div className="td">
                                {data.homeScore}-{data.awayScore}
                            </div>
                            <div className="td">
                                {truncateFloatingPoint(Number(data.homeCurrentOdds), 2)}
                            </div>
                            <div className="td">{handicapToString(data.currentHandicap)}</div>
                            <div className="td">
                                {truncateFloatingPoint(Number(data.awayCurrentOdds), 2)}
                            </div>
                            <div className="td">{handleMatchDateTime(data.oddsChangeTime)}</div>
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

export default HandicapTable;
